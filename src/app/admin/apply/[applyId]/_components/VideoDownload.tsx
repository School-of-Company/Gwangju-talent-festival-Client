"use client";

import { useState } from "react";
import { DownloadIcon } from "@/shared/asset/svg/DownloadIcon";

interface Props {
  applyId: string;
  downloadKey?: string;
}

export default function VideoDownload({ applyId, downloadKey }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/server/apply/${applyId}/video${downloadKey ? `?key=${downloadKey}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      const { videoUrl } = (await res.json()) as { videoUrl: string };
      const a = document.createElement("a");
      a.href = videoUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      setError("다운로드 링크 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-16 w-full">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="w-full flex items-center justify-center gap-10 px-28 py-16 bg-orange-500 text-white text-body2b rounded-xl hover:bg-[#e8873c] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-sm"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-20 w-20 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            링크 생성 중...
          </>
        ) : (
          <>
            <DownloadIcon width={20} height={20} color="white" />
            영상 다운로드
          </>
        )}
      </button>

      {error && <p className="text-caption1r text-[#E13A3A] text-center">{error}</p>}

      <div className="flex items-center gap-6 text-caption1r text-gray-400">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#A7A7A7" strokeWidth="2" />
          <path d="M12 7v5l3 3" stroke="#A7A7A7" strokeWidth="2" strokeLinecap="round" />
        </svg>
        링크는 10분간 유효합니다. 만료 시 다시 클릭하세요.
      </div>
    </div>
  );
}
