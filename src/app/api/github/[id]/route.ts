import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const gh = await fetch(`https://api.github.com/users/${encodeURIComponent(id)}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "gwangtalpe-client",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN ?? ""}`,
    },
    next: { revalidate: 86400 },
  });

  if (!gh.ok) {
    if (gh.status === 404) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "failed to fetch" }, { status: gh.status });
  }

  const data = await gh.json();
  return NextResponse.json(data, { status: 200 });
}
