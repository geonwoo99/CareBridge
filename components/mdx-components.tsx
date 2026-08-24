// components/mdx-components.tsx
// ─────────────────────────────────────────────────────────────
// MDX 본문에서 사용 가능한 모든 컴포넌트를 등록하는 중앙 레지스트리
// ─────────────────────────────────────────────────────────────

import { Figure } from "./media/Figure";
import { Video } from "./media/Video";
import { YouTube } from "./media/YouTube";
import { Gif } from "./media/Gif";

// 공통 UI 프리미티브
import { Callout } from "./primitives/Callout";
import { Checklist } from "./primitives/Checklist";
import { SpeciesToggle, PageSpeciesToggle, Dog, Cat } from "./primitives/SpeciesToggle";
import { StatGrid } from "./primitives/StatGrid";
import { ExpandableCards } from "./primitives/ExpandableCards";
import { OptionAdvisor } from "./primitives/OptionAdvisor";
import { TableOfContents } from "./primitives/TableOfContents";
import { Section } from "./primitives/Section";
import { TaggedList } from "./primitives/TaggedList";
import { Timeline } from "./primitives/Timeline";
import { EvidenceQuote } from "./primitives/EvidenceQuote";
import { CompareColumns } from "./primitives/CompareColumns";
import { StatusList } from "./primitives/StatusList";
import { SourceNotice } from "./primitives/SourceNotice";
import { ColorDiagnostic } from "./primitives/ColorDiagnostic";
import { RecoveryTracker } from "./primitives/RecoveryTracker";
import { ContactCard } from "./primitives/ContactCard";
import { ScoreDial } from "./primitives/ScoreDial";
import { AboutModal } from "./primitives/AboutModal";
import { AssessmentForm } from "./primitives/AssessmentForm";
import { CountdownTimer } from "./primitives/CountdownTimer";
import { PrincipleGrid } from "./primitives/PrincipleGrid";
import { StepCarousel } from "./primitives/StepCarousel";
import { NutrientDonut } from "./primitives/NutrientDonut";

// 수의사 전용 임상 컴포넌트
import { DosageTable } from "./primitives/DosageTable";
import { AlgorithmFlow } from "./primitives/AlgorithmFlow";

// 특정 주제 대화형 블록 및 계산기
import { SRRCalculator } from "./interactive/SRRCalculator";
import { KittenAgeEstimator } from "./interactive/KittenAgeEstimator";
import {
  UrineColorDiagnostic,
  StoolColorDiagnostic,
  WeaningTimeline,
  KittenRedFlags,
} from "./interactive/KittenCareBlocks";
import {
  PostSurgeryTracker,
  PostSurgeryQnA,
  PostSurgeryRedFlags,
} from "./interactive/PostSurgeryBlocks";
import { FeedingTubeCalculator } from "./interactive/FeedingTubeCalculator";
import {
  FeedingTubeTips,
  FeedingTubeRedFlags,
} from "./interactive/FeedingTubeBlocks";
import {
  CheckupLifeStagePicker,
  CheckupEvidence,
  PreVisitSedativeCard,
  ScreeningRecommended,
  ScreeningOptional,
} from "./interactive/CheckupBlocks";
import {
  DermatoHeroStats,
  CcatsGrid,
  DermatoSteps,
  TenMinuteTimer,
  DisinfectantOptions,
  DermatoChecklist,
  DermatoCleanFrequency,
  DermatoFaq,
} from "./interactive/DermatophyteBlocks";
import { BleachCalculator } from "./interactive/BleachCalculator";
import {
  InhalerWhy,
  InhalerHowToCarousel,
  InhalerTraining,
  InhalerMindset,
  InhalerCleaning,
} from "./interactive/InhalerBlocks";
import {
  ChemoHandlingSteps,
  ChemoFaq,
  BagSideEffects,
  ChemoDrugFilter,
} from "./interactive/ChemoBlocks";
import { DrugFilter } from "./interactive/DrugFilter";

export const mdxComponents = {
  // 미디어
  Figure,
  Video,
  YouTube,
  Gif,

  // 공통 UI 프리미티브
  Callout,
  Checklist,
  SpeciesToggle,
  PageSpeciesToggle,
  Dog,
  Cat,
  StatGrid,
  ExpandableCards,
  OptionAdvisor,
  TableOfContents,
  Section,
  TaggedList,
  Timeline,
  EvidenceQuote,
  CompareColumns,
  StatusList,
  SourceNotice,
  ColorDiagnostic,
  RecoveryTracker,
  ContactCard,
  ScoreDial,
  AboutModal,
  AssessmentForm,
  CountdownTimer,
  PrincipleGrid,
  StepCarousel,
  NutrientDonut,

  // 수의사 전용 임상 컴포넌트
  DosageTable,
  AlgorithmFlow,

  // 대화형 요소 및 특정 주제 블록
  SRRCalculator,
  KittenAgeEstimator,
  UrineColorDiagnostic,
  StoolColorDiagnostic,
  WeaningTimeline,
  KittenRedFlags,
  PostSurgeryTracker,
  PostSurgeryQnA,
  PostSurgeryRedFlags,
  FeedingTubeCalculator,
  FeedingTubeTips,
  FeedingTubeRedFlags,
  CheckupLifeStagePicker,
  CheckupEvidence,
  PreVisitSedativeCard,
  ScreeningRecommended,
  ScreeningOptional,
  BleachCalculator,
  DermatoHeroStats,
  CcatsGrid,
  DermatoSteps,
  TenMinuteTimer,
  DisinfectantOptions,
  DermatoChecklist,
  DermatoCleanFrequency,
  DermatoFaq,
  InhalerWhy,
  InhalerHowToCarousel,
  InhalerTraining,
  InhalerMindset,
  InhalerCleaning,
  DrugFilter,
  ChemoHandlingSteps,
  ChemoFaq,
  BagSideEffects,
  ChemoDrugFilter,
};
