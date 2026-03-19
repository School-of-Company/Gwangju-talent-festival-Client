import { toast } from "sonner";
import { clearTokens } from "@/shared/utils/auth";
import { logout } from "@/widgets/signin/api/logout";

export const handleLogout = async () => {
  try {
    await logout();
  } catch {
  } finally {
    clearTokens();
    toast.success("로그아웃 되었습니다");
    window.location.href = "/signin";
  }
};
