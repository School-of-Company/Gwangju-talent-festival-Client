import { notFound } from "next/navigation";
import { Logo } from "@/shared/asset/svg/Logo";
import { colors } from "@/shared/utils/color";
import VideoDownload from "./_components/VideoDownload";

interface Props {
  params: Promise<{ applyId: string }>;
  searchParams: Promise<{ key?: string; name?: string }>;
}

export default async function AdminApplyDownloadPage({ params, searchParams }: Props) {
  const { applyId } = await params;
  const { key, name } = await searchParams;

  if (!key || key !== process.env.ADMIN_DOWNLOAD_KEY) {
    notFound();
  }

  const fileName = name ? decodeURIComponent(name) : null;

  return (
    <div
      className="flex flex-col items-center justify-center px-16"
      style={{ height: "calc(100vh - 81px)" }}
    >
      <Logo height={131} color={colors.orange[500]} width={211} />

      <div className="mt-[52px] flex flex-col items-center gap-28 w-full max-w-[400px]">
        <h1 className="sm:text-title2b text-title4b text-center">공연 영상 다운로드</h1>

        <div className="w-full rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
          <div className="flex items-center px-20 py-14">
            <span className="text-caption1r text-gray-400 w-[72px] shrink-0">신청 ID</span>
            <span className="text-body3b text-gray-800">#{applyId}</span>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="px-20 py-14">
            <span className="text-body3r text-gray-700 break-all leading-relaxed">
              {fileName ?? "-"}
            </span>
          </div>
        </div>

        <VideoDownload applyId={applyId} downloadKey={key} />
      </div>
    </div>
  );
}
