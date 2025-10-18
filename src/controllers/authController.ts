import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/User';
import { calculateZodiacSign } from '../utils/zodiacUtils';
import { generateJWT, formatUserResponse } from '../utils/authUtils';
import { sendError, sendSuccess } from '../utils/responseUtils';


export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, birthdate } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      sendError(res, 409, 'User with this email already exists');
      return;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      birthdate: new Date(birthdate),
      zodiacSign: calculateZodiacSign(new Date(birthdate))
    });

    sendSuccess(res, {
      message: 'User created successfully',
      user: formatUserResponse(user),
      token: generateJWT(user)
    }, 201);
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user and verify password
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      sendError(res, 401, 'Invalid email or password');
      return;
    }

    sendSuccess(res, {
      message: 'Login successful',
      user: formatUserResponse(user),
      token: generateJWT(user)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
