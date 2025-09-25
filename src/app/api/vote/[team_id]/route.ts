import { NextRequest } from "next/server";
import { apiHandler } from "@/shared/utils/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ team_id: string }> }
) {
  const resolvedParams = await params;
  return apiHandler(request, `/vote/${resolvedParams.team_id}`, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ team_id: string }> }
) {
  const resolvedParams = await params;
  return apiHandler(request, `/vote/${resolvedParams.team_id}`, "POST");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ team_id: string }> }
) {
  const resolvedParams = await params;
  return apiHandler(request, `/vote/${resolvedParams.team_id}`, "DELETE");
}
