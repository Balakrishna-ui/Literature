interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const rateLimits = new Map<string, RateLimitInfo>();

export function getRateLimit(ip: string, limit: number = 5, windowMs: number = 15 * 60 * 1000): { success: boolean; remaining: number } {
  const now = Date.now();
  const info = rateLimits.get(ip);

  // Clean up expired rate limit or set up initial
  if (!info || now > info.resetTime) {
    rateLimits.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: limit - 1 };
  }

  // Increment count if within window
  if (info.count < limit) {
    info.count += 1;
    return { success: true, remaining: limit - info.count };
  }

  // Block request if limit exceeded
  return { success: false, remaining: 0 };
}
