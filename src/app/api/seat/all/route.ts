import { apiHandler } from "@/shared/utils/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return apiHandler(
    request,
    "/seat/all",
    "GET",
    200
  );
} 