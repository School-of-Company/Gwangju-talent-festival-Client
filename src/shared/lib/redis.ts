import Redis, { type Redis as RedisType } from "ioredis";

declare global {
  var _redis: RedisType | undefined;
}

function createRedis(): RedisType {
  return new Redis(process.env.REDIS_URL!, {
    tls: {},
    connectTimeout: 10_000,
    maxRetriesPerRequest: 2,
    retryStrategy: (times: number) => Math.min(times * 200, 2000),
  });
}

export const redis = global._redis ?? createRedis();
if (!global._redis) global._redis = redis;
