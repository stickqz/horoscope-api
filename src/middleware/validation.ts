import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


const validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};


export const validateSignup = validate(Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  birthdate: Joi.date().max('now').required()
}));


export const validateLogin = validate(Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
}));
