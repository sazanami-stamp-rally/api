import { Redis } from "ioredis";

// REDIS_HOST, REDIS_PORTが設定されている場合はそれを使う
// そうでない場合は localhost を使う

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
});

export default redis;
