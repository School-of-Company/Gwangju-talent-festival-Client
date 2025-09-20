import { NextRequest } from "next/server";
import { apiHandler } from "@/shared/utils/api";

export async function GET(request: NextRequest) {
  return apiHandler(request, "/judge", "GET");
}
