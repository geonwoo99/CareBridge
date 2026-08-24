import { guides } from "#site/content";
import { GuideList } from "@/components/GuideList";

export default function VetHome() {
  return (
    <GuideList 
      title="인턴 수의사 임상 가이드"
      description="바쁜 임상 현장에서 빠르게 참고할 수 있는 수의사용 가이드라인입니다."
      guides={guides}
      targetAudience="vet"
    />
  );
}
