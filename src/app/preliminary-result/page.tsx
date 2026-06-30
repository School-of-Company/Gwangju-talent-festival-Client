import PreliminaryResultView from "@/views/preliminary-result/ui/PreliminaryResultView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "예선 진출팀 발표 | 광주학생탈렌트페스티벌",
  description: "2026 광탈페 光트로 예선 진출팀 24팀을 발표합니다.",
};

export default function PreliminaryResultPage() {
  return <PreliminaryResultView />;
}
