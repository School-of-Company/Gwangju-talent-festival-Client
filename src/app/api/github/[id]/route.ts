import { redis } from "@/shared/lib/redis";
import { NextResponse } from "next/server";

const KEY = (id: string) => `gh:user:${id}`;
const TTL_SECONDS = 60 * 60 * 24;

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let cached: string | null = null;
  try {
    cached = await redis.get(KEY(id));
  } catch (e) {
    throw e;
  }
  if (cached) {
    return new NextResponse(cached, {
      status: 200,
      headers: { "Content-Type": "application/json", "X-Cache": "HIT" },
    });
  }

  const gh = await fetch(`https://api.github.com/users/${encodeURIComponent(id)}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "gwangtalpe-client",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN ?? ""}`,
    },
    cache: "no-store",
  });

  if (!gh.ok) {
    if (gh.status === 404) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "failed to fetch" }, { status: gh.status });
  }

  const data = await gh.json();

  try {
    await redis.set(KEY(id), JSON.stringify(data), "EX", TTL_SECONDS);
  } catch (error) {
    throw error;
  }

  return NextResponse.json(data, { status: 200, headers: { "X-Cache": "MISS" } });
}
