import { notFound } from "next/navigation";
import VideoDownload from "./_components/VideoDownload";

interface Props {
  params: Promise<{ applyId: string }>;
  searchParams: Promise<{ key?: string }>;
}

export default async function AdminApplyDownloadPage({ params, searchParams }: Props) {
  const { applyId } = await params;
  const { key } = await searchParams;

  if (!key || key !== process.env.ADMIN_DOWNLOAD_KEY) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-24 px-16">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-title4b">공연 영상 다운로드</h1>
        <p className="text-caption1r text-gray-400">신청 ID: {applyId}</p>
      </div>
      <VideoDownload applyId={applyId} />
    </div>
  );
}
