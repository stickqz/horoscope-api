import { Response } from 'express';
import { Op } from 'sequelize';

import { AuthRequest } from '../types';
import { getHoroscopeForSign } from '../utils/horoscopeData';
import { sendError, sendSuccess, formatHoroscopeRecord } from '../utils/responseUtils';
import HoroscopeHistory from '../models/HoroscopeHistory';


export const getTodayHoroscope = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 401, 'User not authenticated');
      return;
    }

    const { zodiacSign } = req.user;
    const today = new Date();

    // Find or create today's horoscope
    let horoscopeRecord = await HoroscopeHistory.findOne({
      where: { userId: req.user.id, date: today }
    });

    if (!horoscopeRecord) {
      horoscopeRecord = await HoroscopeHistory.create({
        userId: req.user.id,
        zodiacSign,
        content: getHoroscopeForSign(zodiacSign),
        date: today
      });
    }

    sendSuccess(res, {
      zodiacSign,
      date: today.toISOString().split('T')[0],
      horoscope: horoscopeRecord.content
    });
  } catch (error) {
    console.error('Get today horoscope error:', error);
    sendError(res, 500, 'Internal server error');
  }
};


const getHistoryQuery = (userId: number, sevenDaysAgo: Date) => 
  HoroscopeHistory.findAll({
    where: { userId, date: { [Op.gte]: sevenDaysAgo } },
    order: [['date', 'DESC']],
    attributes: ['zodiacSign', 'content', 'date']
  });

  
export const getHoroscopeHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 401, 'User not authenticated');
      return;
    }

    const { zodiacSign } = req.user;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    let history = await getHistoryQuery(req.user.id, sevenDaysAgo);

    // If no history exists, create today's horoscope first
    if (history.length === 0) {
      await HoroscopeHistory.create({
        userId: req.user.id,
        zodiacSign,
        content: getHoroscopeForSign(zodiacSign),
        date: new Date()
      });
      history = await getHistoryQuery(req.user.id, sevenDaysAgo);
    }

    sendSuccess(res, {
      zodiacSign,
      history: history.map(formatHoroscopeRecord)
    });
  } catch (error) {
    console.error('Get horoscope history error:', error);
    sendError(res, 500, 'Internal server error');
  }
};
