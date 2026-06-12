import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? "";

  const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apply`, {
    method: "POST",
    headers: { "content-type": contentType },
    body: req.body,
    // @ts-expect-error duplex is required for streaming request body in Node.js
    duplex: "half",
  });

  if (!uploadRes.ok) {
    if (uploadRes.status === 413) {
      return NextResponse.json(
        { message: "영상 파일이 너무 큽니다. 500MB 이하의 파일만 제출 가능합니다." },
        { status: 400 }
      );
    }
    const errBody = await uploadRes.text().catch(() => "");
    console.error(`[apply/video] 백엔드 업로드 실패 status=${uploadRes.status}`, errBody);
    return NextResponse.json(
      { message: "영상 업로드에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }

  return NextResponse.json(await uploadRes.json());
}
