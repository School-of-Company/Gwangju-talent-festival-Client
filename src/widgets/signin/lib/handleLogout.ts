import { toast } from "sonner";
import { logout } from "../api/logout";
import { clearTokens } from "@/shared/utils/auth";

export const handleLogout = async () => {
  const res = await logout();
  if (res.status === 200) {
    toast.success("로그아웃 되었습니다");
    clearTokens();
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
  } else {
    toast.error("로그아웃 실패하셨습니다");
  }
};
