import { toast } from "sonner";
import { logout } from "../api/logout";
import { clearTokens } from "@/shared/utils/auth";

export const handleLogout = async () => {
  try {
    await logout();
    toast.success("로그아웃 되었습니다");
    clearTokens();
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
  } catch (error) {
    console.error(error);
    toast.error(error instanceof Error ? error.message : "로그아웃 실패하셨습니다");
  }
};
