// components/primitives/ShareQR.tsx
// ─────────────────────────────────────────────────────────────
// 이 페이지의 주소를 QR 코드로 보여줍니다.
// 진료실에서 보호자가 폰으로 스캔 → 집에서 다시 보기 동선용입니다.
// 인쇄물에도 함께 나오도록 했습니다(종이 + 디지털 연결).
//
// slug 기반으로 site.config의 baseUrl과 합쳐 전체 주소를 만듭니다.
// (slug가 안정적이어야 QR이 안 깨집니다 — rules/50)
//
// ※ 설치 필요: npm install qrcode.react
// ─────────────────────────────────────────────────────────────

import { QRCodeSVG } from "qrcode.react";
import { siteConfig } from "@/lib/site.config";

export function ShareQR({ slug }: { slug: string }) {
  const url = `${siteConfig.baseUrl}/guides/${slug}`;

  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <QRCodeSVG value={url} size={72} />
      <div className="text-sm">
        <p className="font-semibold">폰으로 스캔해서 보기</p>
        <p className="break-all text-xs text-muted-foreground">{url}</p>
      </div>
    </div>
  );
}
