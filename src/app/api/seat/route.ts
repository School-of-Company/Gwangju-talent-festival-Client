import { NextRequest } from "next/server";
import { apiHandler } from "@/shared/utils/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");
  
  const endpoint = section ? `/seat?seat_section=${section}` : "/seat/all";
  
  return apiHandler(
    request,
    endpoint,
    "GET",
    200
  );
}

export async function POST(request: NextRequest) {
  return apiHandler(
    request,
    "/seat",
    "POST",
    201
  );
}

export async function DELETE(request: NextRequest) {
  return apiHandler(
    request,
    "/seat",
    "DELETE",
    200
  );
}

