import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const field = formData.get("field") as string;
    const teamName = formData.get("teamName") as string;
    const school = formData.get("school") as string;
    const representative = formData.get("representative") as string;
    const contact = formData.get("contact") as string;

    const applicationFile = formData.get("applicationFile") as File | null;
    const privacyFile = formData.get("privacyFile") as File | null;
    const videoFile = formData.get("videoFile") as File | null;

    if (!field || !teamName || !school || !representative || !contact) {
      return NextResponse.json({ message: "모든 항목을 입력해주세요." }, { status: 400 });
    }

    if (!applicationFile || !privacyFile || !videoFile) {
      return NextResponse.json({ message: "모든 파일을 첨부해주세요." }, { status: 400 });
    }

    const appExt = applicationFile.name.split(".").pop()?.toLowerCase();
    const privExt = privacyFile.name.split(".").pop()?.toLowerCase();
    const vidExt = videoFile.name.split(".").pop()?.toLowerCase();

    if (appExt !== "pdf") {
      return NextResponse.json(
        { message: "참가신청서는 PDF 파일만 제출 가능합니다." },
        { status: 400 }
      );
    }
    if (privExt !== "pdf") {
      return NextResponse.json(
        { message: "개인정보활용동의서는 PDF 파일만 제출 가능합니다." },
        { status: 400 }
      );
    }
    if (vidExt !== "mp4") {
      return NextResponse.json(
        { message: "공연 영상은 MP4 파일만 제출 가능합니다." },
        { status: 400 }
      );
    }

    const fileName = `${field}_${teamName}_${school}_${representative}_${contact}`;

    const videoFormData = new FormData();
    videoFormData.append("file", videoFile);

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/apply`;
    console.error("[apply] 영상 업로드 요청:", backendUrl);

    const uploadRes = await fetch(backendUrl, {
      method: "POST",
      body: videoFormData,
    });

    if (!uploadRes.ok) {
      const errBody = await uploadRes.text().catch(() => "");
      console.error(`[apply] 백엔드 업로드 실패 status=${uploadRes.status}`, errBody);
      return NextResponse.json(
        { message: "영상 업로드에 실패했습니다. 잠시 후 다시 시도해주세요." },
        { status: 500 }
      );
    }

    const { applyId } = (await uploadRes.json()) as { applyId: number; videoUrl: string };

    const origin = req.nextUrl.origin;
    const downloadUrl = `${origin}/admin/apply/${applyId}?key=${process.env.ADMIN_DOWNLOAD_KEY}&name=${encodeURIComponent(fileName)}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const [appBuffer, privBuffer] = await Promise.all([
      applicationFile.arrayBuffer().then((ab) => Buffer.from(ab)),
      privacyFile.arrayBuffer().then((ab) => Buffer.from(ab)),
    ]);

    await transporter.sendMail({
      from: `"2026 광탈페 접수" <${process.env.SMTP_USER}>`,
      to: process.env.APPLY_EMAIL,
      subject: `[2026 광탈페 참가신청] ${fileName}`,
      text: [
        "2026 광탈페 참가신청이 접수되었습니다.",
        "",
        `분야: ${field}`,
        `팀명: ${teamName}`,
        `대표자학교: ${school}`,
        `대표자명: ${representative}`,
        `연락처: ${contact}`,
        "",
        `파일명: ${fileName}`,
        "",
        `공연 영상 다운로드: ${downloadUrl}`,
      ].join("\n"),
      attachments: [
        {
          filename: applicationFile.name,
          content: appBuffer,
          contentType: "application/pdf",
        },
        {
          filename: privacyFile.name,
          content: privBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ message: "접수가 완료되었습니다." });
  } catch (error) {
    console.error("[apply] 처리 중 예외 발생:", error);
    return NextResponse.json(
      { message: "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
