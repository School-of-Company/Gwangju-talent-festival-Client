import { NextRequest } from "next/server";
import { apiHandler } from "@/shared/utils/api";

export async function DELETE(request: NextRequest) {
  return apiHandler(request, "/seat/performer", "DELETE", 200);
}
