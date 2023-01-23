import { Request, Response, NextFunction } from 'express';
import { EventTypeEnum } from '../config/enums';
import {
   abilityValidation,
   attackValidation,
   eventTypeValidation,
   messageValidation,
   restoreValidation,
} from '../validations/events';
import updateValidation from '../validations/update';
import registrationValidation from '../validations/registration';



class Validation {
   static registration(req: Request, res: Response, next: NextFunction) {
      const registrationData = req.body;

      registrationValidation(registrationData);

      next();
   }

   static update(req: Request, res: Response, next: NextFunction) {
      const updateData = req.body;

      updateValidation(updateData);

      next();
   }

   static events(data: any) {

      eventTypeValidation(data);

      switch (data.type) {
         case EventTypeEnum.attack:
            attackValidation(data);
            break;
         case EventTypeEnum.ability:
            abilityValidation(data);
            break;
         case EventTypeEnum.message:
            messageValidation(data);
            break;
         case EventTypeEnum.restore:
            restoreValidation(data);
            break;
      }
   }
}

export default Validation;
