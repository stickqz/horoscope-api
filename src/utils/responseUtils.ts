import { Response } from 'express';


export const sendError = (res: Response, status: number, message: string): void => {
  res.status(status).json({ error: message });
};


export const sendSuccess = (res: Response, data: any, status: number = 200): void => {
  res.status(status).json(data);
};


export const formatHoroscopeRecord = (record: any) => ({
  date: new Date(record.date).toISOString().split('T')[0],
  horoscope: record.content
});
