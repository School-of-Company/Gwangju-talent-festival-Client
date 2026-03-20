import { toast } from "sonner";
import { clearTokens } from "@/shared/utils/auth";
import { logout } from "@/widgets/signin/api/logout";

export const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error("로그아웃 API 호출에 실패했습니다:", error);
  } finally {
    clearTokens();
    toast.success("로그아웃 되었습니다");
    window.location.href = "/signin";
  }
};
