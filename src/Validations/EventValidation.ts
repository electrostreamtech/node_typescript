import Joi from "joi";

export const EventValidation = Joi.object({
  title: Joi.string().min(3).required(),
  location: Joi.string().min(3).required(),
  date: Joi.string().required(),
});

export const EventIdValidation = Joi.string().required();

export const UpdateEventValidation = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().min(3).required(),
  location: Joi.string().min(3).required(),
  date: Joi.string().required(),
});
