import { isLoggedIn } from "@/shared/utils/auth";
import { useEffect, useState } from "react";

export function useAuthSync() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const updateLoginState = () => {
      const loginStatus = isLoggedIn();
      setIsUserLoggedIn(loginStatus);
    };

    updateLoginState();

    const handleStorageChange = () => {
      updateLoginState();
    };

    const handleFocus = () => {
      updateLoginState();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateLoginState();
      }
    };

    const handlePopstate = () => {
      updateLoginState();
    };

    const handleBeforeUnload = () => {
      updateLoginState();
    };

    const interval = setInterval(() => {
      updateLoginState();
    }, 5000);

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("popstate", handlePopstate);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("popstate", handlePopstate);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  return { isUserLoggedIn };
}
