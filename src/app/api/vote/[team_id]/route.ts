import { NextRequest } from "next/server";
import { apiHandler } from "@/shared/utils/api";

export async function GET(
  request: NextRequest,
  { params }: { params: { team_id: string } }
) {
  return apiHandler(request, `/vote/${params.team_id}`, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: { team_id: string } }
) {
  return apiHandler(request, `/vote/${params.team_id}`, "POST");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { team_id: string } }
) {
  return apiHandler(request, `/vote/${params.team_id}`, "DELETE");
}
