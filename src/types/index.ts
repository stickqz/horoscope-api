import { Request } from 'express';


export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  zodiacSign: ZodiacSign;
  createdAt: Date;
  updatedAt: Date;
}


export interface HoroscopeHistory {
  id: number;
  userId: number;
  zodiacSign: ZodiacSign;
  content: string;
  date: Date;
  createdAt: Date;
}


export type ZodiacSign = 
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' 
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' 
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';


export interface AuthRequest extends Request {
  user?: User;
}


export interface ZodiacDateRange {
  start: { month: number; day: number };
  end: { month: number; day: number };
}


export interface HoroscopeContent {
  [key: string]: string;
}
