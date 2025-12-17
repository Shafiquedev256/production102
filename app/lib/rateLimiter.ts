// /lib/rateLimiter.ts
import { LRUCache } from "lru-cache";

// Create the LRU cache instance
const limiter = new LRUCache<string, number>({
  max: 500, // track max 500 unique IPs
  ttl: 1000 * 60 * 15, // 15 minutes
});

/**
 * Checks if the given IP is rate-limited.
 * @param ip - Client IP address
 * @param limit - Maximum allowed requests within TTL
 * @returns true if rate-limited, false otherwise
 */
export function isRateLimited(ip: string, limit = 5): boolean {
  const current = limiter.get(ip) || 0;
  if (current >= limit) return true;
  limiter.set(ip, current + 1);
  return false;
}
