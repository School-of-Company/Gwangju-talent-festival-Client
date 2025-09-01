import { NextRequest, NextResponse } from "next/server";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiHandler(
  request: NextRequest,
  endpoint: string,
  method: ApiMethod = "POST",
  successStatus: number = 200,
  additionalHeaders?: Record<string, string>
) {
  try {
    let body = null;
    if (method !== "GET") {
      try {
        body = await request.json();
      } catch {
        console.log("No body or invalid JSON in request");
      }
    }
    
    const url = `${BASE_URL}${endpoint}`;

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...additionalHeaders,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    let data = {};
    const responseText = await response.text();

    if (responseText.trim()) {
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { message: responseText };
      }
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: successStatus });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "요청 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
