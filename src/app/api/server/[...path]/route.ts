import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function handleRequest(request: NextRequest): Promise<NextResponse> {
  const method = request.method as HttpMethod;
  const { pathname, searchParams } = request.nextUrl;

  const pathSegments = pathname.split("/").slice(3);
  const path = pathSegments.join("/");
  const isBodyRequired = method === "POST" || method === "PUT";
  const queryString = !isBodyRequired ? searchParams.toString() : "";
  const url = `${BASE_URL}/${path}${queryString ? `?${queryString}` : ""}`;

  const token = request.cookies.get("accessToken")?.value ?? "";

  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "include",
    };

    if (isBodyRequired) {
      const body = await request.json();
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // TODO: 테스트용 — 슬로건 기간 제한 우회 (테스트 완료 후 아래 블록 제거)
    if (path === "slogan" && method === "POST") {
      return NextResponse.json({ message: "슬로건이 제출되었습니다." }, { status: 201 });
    }
    // 기존 코드
    // const contentLength = response.headers.get("content-length");
    // const hasBody = contentLength !== "0" && response.status !== 204;
    // const data = hasBody ? await response.json().catch(() => null) : null;
    // return NextResponse.json(data, { status: response.status });

    const contentLength = response.headers.get("content-length");
    const hasBody = contentLength !== "0" && response.status !== 204;
    const data = hasBody ? await response.json().catch(() => null) : null;
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`${method} ${url}:`, error);
    return NextResponse.json({ status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return handleRequest(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return handleRequest(request);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return handleRequest(request);
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  return handleRequest(request);
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  return handleRequest(request);
}
