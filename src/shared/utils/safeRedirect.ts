export const isSafeRedirectPath = (next: string | null | undefined): next is string => {
  if (!next) return false;
  if (!next.startsWith("/")) return false;
  if (next.startsWith("//") || next.startsWith("/\\")) return false;
  if (next === "/signin") return false;
  return true;
};
