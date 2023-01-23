import Joi from 'joi';
import { CharacterClassesEnum } from '../config/enums';
import { BadRequest } from '../exceptions/ApiError';

export default function updateValidation(data: object) {
   const update = Joi.object({
      username: Joi
         .string()
         .required()
         .regex(/^[a-z0-9_-]{3,16}$/).message("Invalid username"),
      currentPassword: Joi
         .string()
         .required(),
      newPassword: Joi
         .string()
         .min(6).message('New password must be longer than 6 characters')
         .max(15).message('New password must be less than 15 characters')
         .required(),
      duplicatePassword: Joi
         .string()
         .equal(Joi.ref('newPassword')).messages({ 'any.only': 'Passwords do not match' })
         .required(),
      characterClass: Joi
         .number()
         .valid(...Object.values(CharacterClassesEnum)).messages({ 'any.only': 'The selected character class does not exist' })
         .required(),
   });

   const { error } = update.validate(data, { abortEarly: false });
   if (error) {
      throw new BadRequest(error.details[0].message);
   }
}