import { NextRequest } from "next/server";
import { apiHandler } from "@/shared/utils/api";

export async function DELETE(request: NextRequest) {
  const refreshTokenHeader = request.headers.get("refresh-token") || 
                            request.headers.get("Refresh-Token");
  
  if (!refreshTokenHeader) {
    return new Response(JSON.stringify({ message: "Refresh token is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return apiHandler(
    request,
    "/auth/logout",
    "DELETE",
    200,
    { "Refresh-Token": refreshTokenHeader }
  );
}
