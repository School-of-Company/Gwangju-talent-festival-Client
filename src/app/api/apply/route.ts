import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildEmailHtml } from "./_lib/emailTemplate";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const applyId = formData.get("applyId") as string;
    const field = formData.get("field") as string;
    const teamName = formData.get("teamName") as string;
    const school = formData.get("school") as string;
    const representative = formData.get("representative") as string;
    const contact = formData.get("contact") as string;

    const applicationFile = formData.get("applicationFile") as File | null;
    const privacyFile = formData.get("privacyFile") as File | null;

    if (!applyId || !field || !teamName || !school || !representative || !contact) {
      return NextResponse.json({ message: "모든 항목을 입력해주세요." }, { status: 400 });
    }

    if (!applicationFile || !privacyFile || !(applicationFile instanceof File) || !(privacyFile instanceof File)) {
      return NextResponse.json({ message: "모든 파일을 올바른 형식으로 첨부해주세요." }, { status: 400 });
    }

    const appExt = applicationFile.name.split(".").pop()?.toLowerCase();
    const privExt = privacyFile.name.split(".").pop()?.toLowerCase();

    if (appExt !== "pdf") {
      return NextResponse.json(
        { message: "참가신청서는 PDF 파일만 제출 가능합니다." },
        { status: 400 },
      );
    }
    if (privExt !== "pdf") {
      return NextResponse.json(
        { message: "개인정보활용동의서는 PDF 파일만 제출 가능합니다." },
        { status: 400 },
      );
    }

    const fileName = `${field}_${teamName}_${school}_${representative}_${contact}`;

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
      applicationFile.arrayBuffer().then(ab => Buffer.from(ab)),
      privacyFile.arrayBuffer().then(ab => Buffer.from(ab)),
    ]);

    await transporter.sendMail({
      from: `"2026 광탈페 접수" <${process.env.SMTP_USER}>`,
      to: process.env.APPLY_EMAIL,
      subject: `[2026 광탈페 참가신청] ${fileName}`,
      html: buildEmailHtml({ teamName, field, school, representative, contact, fileName, downloadUrl }),
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
  } catch {
    return NextResponse.json(
      { message: "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 },
    );
  }
}
