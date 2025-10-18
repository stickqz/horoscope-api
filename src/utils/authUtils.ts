import jwt from 'jsonwebtoken';
import { User } from '../types';


export const generateJWT = (user: User): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  return jwt.sign(
    { userId: user.id, email: user.email },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } as jwt.SignOptions
  );
};


export const formatUserResponse = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  zodiacSign: user.zodiacSign,
  birthdate: user.birthdate
});
