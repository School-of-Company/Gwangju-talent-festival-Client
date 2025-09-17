import { toast } from "sonner";
import { logout } from "../api/logout";
import { clearTokens } from "@/shared/utils/auth";

export const handleLogout = async () => {
  try {
    await logout();
    toast.success("로그아웃 되었습니다");
  } catch (error) {
    console.error(error);
    toast.error("로그아웃 중 오류가 발생했습니다. 다시 로그인해주세요.");
  } finally {
    clearTokens();
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
  }
};
