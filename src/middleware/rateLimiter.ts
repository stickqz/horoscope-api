import rateLimit from 'express-rate-limit';


const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000');
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5');


export const apiRateLimiter = rateLimit({
  windowMs,
  max: maxRequests,
  message: { error: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});
