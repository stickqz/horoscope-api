import { Router } from 'express';
import { getTodayHoroscope, getHoroscopeHistory } from '../controllers/horoscopeController';
import { authenticateToken } from '../middleware/auth';
import { apiRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Apply rate limiting and authentication to horoscope routes
router.use(apiRateLimiter);
router.use(authenticateToken);

/**
 * @swagger
 * /api/horoscope/today:
 *   get:
 *     summary: Today's horoscope
 *     tags: [Horoscope]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today's horoscope
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 zodiacSign: { type: string }
 *                 date: { type: string }
 *                 horoscope: { type: string }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/today', getTodayHoroscope);

/**
 * @swagger
 * /api/horoscope/history:
 *   get:
 *     summary: Horoscope history
 *     tags: [Horoscope]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Last 7 days horoscopes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 zodiacSign: { type: string }
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date: { type: string }
 *                       horoscope: { type: string }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/history', getHoroscopeHistory);

export default router;
