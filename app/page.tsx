import { guides } from "#site/content";
import { siteConfig } from "@/lib/site.config";
import { GuideList } from "@/components/GuideList";

export default function Home() {
  return (
    <GuideList 
      title={siteConfig.tagline}
      description={`${siteConfig.brand}가 전하는 반려동물 홈케어 및 건강 수칙`}
      guides={guides}
      targetAudience="owner"
    />
  );
}
