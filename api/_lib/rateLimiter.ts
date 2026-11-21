interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 25; // max 25 requests per minute per IP

/**
 * Periodically cleans up expired rate limit records.
 */
function cleanupExpired() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (record.resetTime < now) {
      rateLimitMap.delete(ip);
    }
  }
}

export function checkRateLimit(clientIp: string): {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
} {
  const now = Date.now();

  // Run a quick prune if map size grows large
  if (rateLimitMap.size > 500) {
    cleanupExpired();
  }

  const record = rateLimitMap.get(clientIp);

  if (!record || record.resetTime < now) {
    rateLimitMap.set(clientIp, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetSeconds: Math.ceil(WINDOW_MS / 1000),
    };
  }

  if (record.count >= MAX_REQUESTS) {
    const resetSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    return {
      allowed: false,
      remaining: 0,
      resetSeconds,
    };
  }

  record.count += 1;
  const remaining = MAX_REQUESTS - record.count;
  const resetSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));

  return {
    allowed: true,
    remaining,
    resetSeconds,
  };
}
