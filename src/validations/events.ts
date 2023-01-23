import Joi from 'joi';
import { EventTypeEnum } from '../config/enums';
import { BadRequest } from '../exceptions/ApiError';

function eventTypeValidation(data: object) {
   const eventType = Joi.object({
      type: Joi
         .number()
         .required()
         .valid(...Object.values(EventTypeEnum))
         .messages({ 'any.only': 'The selected action type does not exist' }),
      userId: Joi.optional(),
      message: Joi.optional(),
   });

   const { error } = eventType.validate(data, { abortEarly: true });
   if (error) {
      throw new BadRequest(error.details[0].message);
   }
}


function attackValidation(data: object) {
// атака
// {
//    "type": EventTypeEnum;
//    "userId": number;
// }
   const attack = Joi.object().keys({
      type: Joi
         .number()
         .required()
         .valid(EventTypeEnum.attack),
      userId: Joi
         .number()
         .integer().message('UserId must be integer')
         .positive().message('UserId must be positive')
         .required(),
   });

   const { error } = attack.validate(data, { abortEarly: true });
   if (error) {
      throw new BadRequest(error.details[0].message);
   }
}


function abilityValidation(data: object) {
// применение способности
// {
//    "type": EventTypeEnum;
//    "userId": number;
// }
   const ability = Joi.object().keys({
      type: Joi
         .number()
         .required()
         .valid(EventTypeEnum.ability),
      userId: Joi
         .number()
         .integer().message('UserId must be integer')
         .positive().message('UserId must be positive')
         .required(),
   });

   const { error } = ability.validate(data, { abortEarly: true });
   if (error) {
      throw new BadRequest(error.details[0].message);
   }
}


function messageValidation(data: object) {
// сообщение
// {
//    "type": EventTypeEnum;
//    "message": string;
// }
   const message = Joi.object().keys({
      type: Joi
         .number()
         .required()
         .valid(EventTypeEnum.message),
      message: Joi
         .string()
         .max(30).message('Maximum message length is 30 character')
         .required(),
   });

   const { error } = message.validate(data, { abortEarly: true });
   if (error) {
      throw new BadRequest(error.details[0].message);
   }
}


function restoreValidation(data: object) {
// возрождение
// {
//    "type": EventTypeEnum;
// }
   const restore = Joi.object().keys({
      type: Joi
         .number()
         .valid(EventTypeEnum.restore)
         .required(),
   });

   const { error } = restore.validate(data, { abortEarly: true });
   if (error) {
      throw new BadRequest(error.details[0].message);
   }
}

export { eventTypeValidation, attackValidation, abilityValidation, messageValidation, restoreValidation }