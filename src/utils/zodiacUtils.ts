import { ZodiacSign, ZodiacDateRange } from '../types';


const ZODIAC_DATES: Record<ZodiacSign, ZodiacDateRange> = {
  Aries: { start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
  Taurus: { start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
  Gemini: { start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
  Cancer: { start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
  Leo: { start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
  Virgo: { start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
  Libra: { start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
  Scorpio: { start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
  Sagittarius: { start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
  Capricorn: { start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
  Aquarius: { start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
  Pisces: { start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
};


export function calculateZodiacSign(birthdate: Date): ZodiacSign {
  const month = birthdate.getMonth() + 1;
  const day = birthdate.getDate();

  for (const [sign, range] of Object.entries(ZODIAC_DATES)) {
    const { start, end } = range;
    
    if (sign === 'Capricorn') {
      if ((month === 12 && day >= start.day) || (month === 1 && day <= end.day)) {
        return sign as ZodiacSign;
      }
    } else if ((month === start.month && day >= start.day) || (month === end.month && day <= end.day)) {
      return sign as ZodiacSign;
    }
  }

  return 'Aries';
}


export function getZodiacSigns(): ZodiacSign[] {
  return Object.keys(ZODIAC_DATES) as ZodiacSign[];
}
