// components/mdx-components.tsx (업데이트)
import { Figure } from "./media/Figure";
import { Video } from "./media/Video";
import { YouTube } from "./media/YouTube";
import { Gif } from "./media/Gif";
import { Callout } from "./primitives/Callout";
import { Checklist } from "./primitives/Checklist";
import { SpeciesToggle, Dog, Cat } from "./primitives/SpeciesToggle";
import { StatGrid } from "./primitives/StatGrid";
import { ExpandableCards } from "./primitives/ExpandableCards";
import { OptionAdvisor } from "./primitives/OptionAdvisor";
import { TableOfContents } from "./primitives/TableOfContents";
import { Section } from "./primitives/Section";
import { TaggedList } from "./primitives/TaggedList";
import { Timeline } from "./primitives/Timeline";
import { EvidenceQuote } from "./primitives/EvidenceQuote";
import { CompareColumns } from "./primitives/CompareColumns";
import { SRRCalculator } from "./interactive/SRRCalculator";

export const mdxComponents = {
  // 미디어
  Figure, Video, YouTube, Gif,
  // 공통 요소
  Callout, Checklist, SpeciesToggle, Dog, Cat, StatGrid, ExpandableCards, OptionAdvisor,
  TableOfContents, Section, TaggedList, Timeline, EvidenceQuote, CompareColumns,
  // 대화형 요소
  SRRCalculator,
  // Disclaimer는 글에 직접 쓰지 않고 레이아웃이 자동 삽입하므로 등록하지 않음
};

