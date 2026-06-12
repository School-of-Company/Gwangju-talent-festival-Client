import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    if (!applicationFile || !privacyFile) {
      return NextResponse.json({ message: "모든 파일을 첨부해주세요." }, { status: 400 });
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
      html: `
        <div style="background: #f4f4f5; padding: 40px 16px; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif;">
          <div style="max-width: 560px; margin: 0 auto;">

            <!-- 헤더 -->
            <div style="background: linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fdba74 100%); border-radius: 16px 16px 0 0; padding: 36px 40px 32px; text-align: center;">
              <img src="${origin}/images/logo-white.png" height="36" alt="광탈페" style="display: block; margin: 0 auto 20px; height: 36px;" />
              <div style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 50px; padding: 6px 16px; margin-bottom: 16px;">
                <span style="color: #ffffff; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;">2026 光탈페 참가신청 접수</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: -1px; line-height: 1.2;">참가신청이 접수되었습니다.</h1>
            </div>

            <!-- 신청 정보 카드 -->
            <div style="background: #ffffff; padding: 32px 40px;">
              <p style="margin: 0 0 20px; color: #6b7280; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">신청자 정보</p>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f3f4f6; width: 110px;">
                    <span style="display: inline-block; background: #f3f4f6; color: #6b7280; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.3px;">팀명</span>
                  </td>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${teamName}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f3f4f6;">
                    <span style="display: inline-block; background: #f3f4f6; color: #6b7280; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.3px;">분야</span>
                  </td>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${field}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f3f4f6;">
                    <span style="display: inline-block; background: #f3f4f6; color: #6b7280; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.3px;">대표자 학교</span>
                  </td>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${school}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f3f4f6;">
                    <span style="display: inline-block; background: #f3f4f6; color: #6b7280; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.3px;">대표자명</span>
                  </td>
                  <td style="padding: 11px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${representative}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 0;">
                    <span style="display: inline-block; background: #f3f4f6; color: #6b7280; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.3px;">연락처</span>
                  </td>
                  <td style="padding: 11px 0; color: #111827; font-size: 14px;">${contact}</td>
                </tr>
              </table>
            </div>

            <!-- 영상 다운로드 섹션 -->
            <div style="background: linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%); padding: 28px 40px; text-align: center;">
              <p style="margin: 0 0 6px; color: #93c5fd; font-size: 12px; letter-spacing: 0.5px;">공연 영상이 업로드되었습니다</p>
              <p style="margin: 0 0 20px; color: #ffffff; font-size: 15px; font-weight: 600;">${fileName}.mp4</p>
              <a href="${downloadUrl}" style="display: inline-block; background: #ffffff; color: #1d4ed8; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 14px; font-weight: 700; letter-spacing: -0.3px;">▶&nbsp; 영상 다운로드</a>
              <p style="margin: 16px 0 0; color: #60a5fa; font-size: 11px; word-break: break-all;">${downloadUrl}</p>
            </div>

            <!-- 푸터 -->
            <div style="padding: 20px 40px 0; text-align: center;">
              <p style="margin: 0; color: #a1a1aa; font-size: 12px; font-weight: 700; letter-spacing: -0.3px;">2026 光광탈페</p>
            </div>

          </div>
        </div>
      `,
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
