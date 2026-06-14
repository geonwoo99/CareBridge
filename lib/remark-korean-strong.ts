import { Plugin } from "unified";
import { Node, Parent } from "unist";

// AST 내부를 순회하는 간단한 헬퍼 함수
function visit(node: Node, test: string, handler: (node: Node, index: number, parent: Parent | undefined) => void, parent?: Parent, index?: number) {
  if (node.type === test) {
    handler(node, index ?? 0, parent);
  }
  if ('children' in node && Array.isArray((node as Parent).children)) {
    const p = node as Parent;
    // 배열을 복사해서 순회 (도중에 원소가 추가/삭제될 수 있으므로)
    const children = [...p.children];
    for (let i = 0; i < children.length; i++) {
      // 실제 원소의 현재 인덱스를 찾음 (위치가 변경되었을 수 있음)
      const currentIndex = p.children.indexOf(children[i]);
      if (currentIndex !== -1) {
        visit(children[i], test, handler, p, currentIndex);
      }
    }
  }
}

// **텍스트** 형태의 마크다운이 한글 조사(입니다, 을, 를 등)와 붙어 있을 때
// 또는 **[링크](url)**와 같이 여러 노드에 걸쳐 있을 때 
// 강조(strong) 태그로 파싱되지 않는 문제를 해결하는 커스텀 플러그인
export const remarkKoreanStrong: Plugin = () => {
  return (tree: Node) => {
    // 1. 단일 텍스트 노드 내부의 **...** 처리
    visit(tree, "text", (node: any, index: number, parent?: Parent) => {
      if (!parent || typeof node.value !== "string") return;

      const value = node.value as string;
      const regex = /\*\*(.+?)\*\*/g;
      
      if (!regex.test(value)) return;
      
      const newChildren: any[] = [];
      let lastIndex = 0;
      regex.lastIndex = 0;
      let match;
      
      while ((match = regex.exec(value)) !== null) {
        if (match.index > lastIndex) {
          newChildren.push({ type: "text", value: value.slice(lastIndex, match.index) });
        }
        
        newChildren.push({
          type: "strong",
          children: [{ type: "text", value: match[1] }]
        });
        
        lastIndex = regex.lastIndex;
      }
      
      if (lastIndex < value.length) {
        newChildren.push({ type: "text", value: value.slice(lastIndex) });
      }
      
      parent.children.splice(index, 1, ...newChildren);
    });

    // 2. 여러 노드에 걸쳐 있는 **...** 처리 (예: **[텍스트](링크)**와)
    function visitParents(node: Node) {
      if ('children' in node && Array.isArray((node as Parent).children)) {
        const p = node as Parent;
        let i = 0;
        while (i < p.children.length) {
          const child = p.children[i] as any;
          
          // 현재 노드가 '**'로 끝나는 텍스트 노드인지 확인
          if (child.type === 'text' && typeof child.value === 'string' && child.value.endsWith('**')) {
            let closingIndex = -1;
            
            // 이후 형제 노드들 중에서 '**'로 시작하는 텍스트 노드를 탐색
            for (let j = i + 1; j < p.children.length; j++) {
              const nextChild = p.children[j] as any;
              if (nextChild.type === 'text' && typeof nextChild.value === 'string' && nextChild.value.startsWith('**')) {
                closingIndex = j;
                break;
              }
            }
            
            // 짝을 찾은 경우
            if (closingIndex !== -1) {
              const startText = child.value.slice(0, -2); // 끝의 ** 제거
              const endChild = p.children[closingIndex] as any;
              const endText = endChild.value.slice(2); // 시작의 ** 제거

              // 중간에 낀 노드들(예: link 노드 등)
              const innerNodes = p.children.slice(i + 1, closingIndex);

              const strongNode = {
                type: 'strong',
                children: innerNodes
              };

              const newNodes: any[] = [];
              if (startText.length > 0) {
                newNodes.push({ type: 'text', value: startText });
              }
              newNodes.push(strongNode);
              if (endText.length > 0) {
                newNodes.push({ type: 'text', value: endText });
              }

              // 기존 노드들(시작 텍스트 ~ 끝 텍스트)을 새로운 노드들로 교체
              p.children.splice(i, closingIndex - i + 1, ...newNodes);
              i += newNodes.length;
              continue;
            }
          }
          i++;
        }
        
        // 자식 노드들도 재귀적으로 순회
        for (const c of p.children) {
          visitParents(c);
        }
      }
    }

    visitParents(tree);
  };
};
