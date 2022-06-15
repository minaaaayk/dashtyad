import { RequestHandler } from 'express';
import Joi from 'joi';
import { Gender, Role } from '../../models';

const createUserSchema = Joi.object({
  username: Joi.string().required(), 
  email: Joi.string().email().required(),
  password: Joi.alternatives(Joi.string(), Joi.number()).required(),
  firstName: Joi.string(),
  lastName:  Joi.string(),
  role: Joi.string().valid(Role.Admin, Role.Guest, Role.Regular),
  gender: Joi.string().valid(Gender.female, Gender.male),
});


const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { body } = req;
    await createUserSchema.validateAsync(body);
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


const updateUserSchema = Joi.object({
  username: Joi.string(), 
  email: Joi.string().email(),
  password: Joi.string(),
  firstName: Joi.string(),
  lastName:  Joi.string(),
  role: Joi.string().valid(Role.Admin, Role.Guest, Role.Regular),
  gender: Joi.string().valid(Gender.female, Gender.male),
});


const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { body } = req;
    await updateUserSchema.validateAsync(body);
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


export const UserValidations = {
    createUser,
    updateUser,
};
