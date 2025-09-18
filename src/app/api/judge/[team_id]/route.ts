import { NextRequest } from "next/server";
import { apiHandler } from "@/shared/utils/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ team_id: string }> }
) {
  const resolvedParams = await params;
  return apiHandler(request, `/judge/${resolvedParams.team_id}`, "GET");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ team_id: string }> }
) {
  const resolvedParams = await params;
  return apiHandler(request, `/judge/${resolvedParams.team_id}`, "PATCH");
}
