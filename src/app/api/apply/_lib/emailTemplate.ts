interface EmailTemplateParams {
  teamName: string;
  field: string;
  school: string;
  representative: string;
  contact: string;
  fileName: string;
  downloadUrl: string;
}

export const buildEmailHtml = ({
  teamName,
  field,
  school,
  representative,
  contact,
  fileName,
  downloadUrl,
}: EmailTemplateParams): string => `
  <div style="background: #f4f4f5; padding: 40px 16px; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif;">
    <div style="max-width: 560px; margin: 0 auto;">

      <!-- 헤더 -->
      <div style="background: linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fdba74 100%); border-radius: 16px 16px 0 0; padding: 36px 40px 32px; text-align: center;">
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
      <div style="background: #18181b; padding: 36px 48px; text-align: center;">
        <p style="margin: 0 0 10px; color: #71717a; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">공연 영상</p>
        <div style="background: #27272a; border-radius: 12px; padding: 14px 20px; margin-bottom: 28px; display: inline-block; min-width: 280px;">
          <p style="margin: 0; color: #e4e4e7; font-size: 13px; font-weight: 600; word-break: break-all;">${fileName}.mp4</p>
        </div>
        <br/>
        <a href="${downloadUrl}" style="display: inline-block; background: #f97316; color: #ffffff; text-decoration: none; padding: 16px 44px; border-radius: 100px; font-size: 15px; font-weight: 700; letter-spacing: -0.3px;">영상 다운로드</a>
        <p style="margin: 20px 0 0;">
          <a href="${downloadUrl}" style="color: #52525b; font-size: 12px; text-decoration: underline;">버튼이 작동하지 않으면 여기를 클릭하세요</a>
        </p>
      </div>

      <!-- 푸터 -->
      <div style="padding: 20px 40px 0; text-align: center;">
        <p style="margin: 0; color: #a1a1aa; font-size: 12px;">© 2026 光탈페. All rights reserved.</p>
      </div>

    </div>
  </div>
`;
