import { RequestHandler } from 'express';
import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string(), 
  email: Joi.string().email(),
  password: Joi.string().required(),
}).xor('username', 'email');

const headerSchema = Joi.object({
  'content-type': Joi.equal('application/json').required(),
}).unknown(true);

const login: RequestHandler = async (req, res, next) => {
  try {
    const { body, headers } = req;
    await headerSchema.validateAsync(headers);
    await loginSchema.validateAsync(body);
    next();
  } catch (err) {
    res.status(400);
    res.json({
      prettyMessage: 'Bad Request',
      status: 400,
      success: false,
    });
  }
};


const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(), 
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const register: RequestHandler = async (req, res, next) => {
  try {
    const { body, headers } = req;
    await headerSchema.validateAsync(headers);
    await registerSchema.validateAsync(body);
    next();
  } catch (err) {
    res.status(400);
    res.json({
      prettyMessage: 'Bad Request',
      status: 400,
      success: false,
    });
  }
};

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const changePassword: RequestHandler = async (req, res, next) => {
  try {
    const { body } = req;
    await changePasswordSchema.validateAsync(body);
    next();
  } catch (err) {
    res.status(400);
    res.json({
      prettyMessage: 'Bad Request',
      status: 400,
      success: false,
    });
  }
};

export const AuthValidations = {
    login,
    register,
    changePassword,
};
