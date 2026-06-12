"use client";

import { useState } from "react";

interface Props {
  applyId: string;
}

export default function VideoDownload({ applyId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/server/apply/${applyId}/video`);
      if (!res.ok) throw new Error("영상 URL 조회에 실패했습니다.");
      const { videoUrl } = (await res.json()) as { videoUrl: string };
      window.open(videoUrl, "_blank");
    } catch {
      setError("다운로드 링크 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="px-24 py-12 bg-orange-500 text-white text-body3b rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "준비 중..." : "영상 다운로드"}
      </button>
      {error && <p className="text-caption1r text-red-500">{error}</p>}
      <p className="text-caption1r text-gray-400">
        링크는 10분간 유효합니다. 만료 시 다시 클릭하세요.
      </p>
    </div>
  );
}
