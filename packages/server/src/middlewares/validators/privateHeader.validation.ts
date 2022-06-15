// Checks if header is valid for protected routes
import { RequestHandler } from 'express';
import Joi from 'joi';

const headerSchema = Joi.object({
  'content-type': Joi.equal('application/json').required(),
  'access-token': Joi.string().required(),
  'refresh-token': Joi.string().required(),
}).unknown(true);

export const privateHeaderValidation: RequestHandler = async (req, res, next) => {
  try {
    await headerSchema.validateAsync(req.headers);
    next();
  } catch (err) {
    res.status(401);
    res.json({
      message: 'Invalid Authentications params',
      status: 401,
      success: false,
    });
  }
};

