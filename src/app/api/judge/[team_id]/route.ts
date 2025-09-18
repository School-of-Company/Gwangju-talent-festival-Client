import { NextRequest } from "next/server";
import { apiHandler } from "@/shared/utils/api";

export async function GET(
  request: NextRequest,
  { params }: { params: { team_id: string } }
) {
  return apiHandler(request, `/judge/${params.team_id}`, "GET");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { team_id: string } }
) {
  return apiHandler(request, `/judge/${params.team_id}`, "PATCH");
}
