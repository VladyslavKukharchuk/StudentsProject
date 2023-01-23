import Joi from 'joi';
import { CharacterClassesEnum } from '../config/enums';
import { BadRequest } from '../exceptions/ApiError';

export default function registrationValidation(data: object) {
   const registration = Joi.object({
      username: Joi
         .string()
         .required()
         .regex(/^[a-z0-9_-]{3,16}$/).message('Invalid username'),
      email: Joi
         .string()
         .regex(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i).message('Invalid email')
         .required(),
      password: Joi
         .string()
         .min(6).message('Password must be longer than 6 characters')
         .max(15).message('Password must be less than 15 characters')
         .required(),
      duplicatePassword: Joi
         .string()
         .equal(Joi.ref('password')).messages({ 'any.only': 'Passwords do not match' })
         .required(),
      characterClass: Joi
         .number()
         .valid(...Object.values(CharacterClassesEnum)).messages({ 'any.only': 'The selected character class does not exist' })
         .required(),
   });

   const { error } = registration.validate(data, { abortEarly: true });
   if (error) {
      console.log(error.details);
      throw new BadRequest(error.details[0].message);
   }
}