import Redis, { type Redis as RedisType } from "ioredis";

declare global {
  var _redis: RedisType | undefined;
}

function buildUrl(): string {
  if (process.env.REDIS_URL && process.env.REDIS_URL.trim().length > 0) {
    return process.env.REDIS_URL.trim();
  }

  const host = process.env.REDIS_HOST!;
  const port = process.env.REDIS_PORT!;
  const password = process.env.REDIS_PASSWORD ?? "";

  const useTLS = process.env.REDIS_TLS === "1" || process.env.REDIS_TLS?.toLowerCase() === "true";

  const protocol = useTLS ? "rediss" : "redis";
  const passEnc = encodeURIComponent(password);

  return `${protocol}://default:${passEnc}@${host}:${port}`;
}

function createRedis(): RedisType {
  const url = buildUrl();
  const isTLS = url.startsWith("rediss://");
  return new Redis(url, {
    ...(isTLS ? { tls: {} } : {}),
    connectTimeout: 10_000,
    maxRetriesPerRequest: 2,
    retryStrategy: (times: number) => Math.min(times * 200, 2000),
  });
}

export const redis = global._redis ?? createRedis();
if (!global._redis) global._redis = redis;
