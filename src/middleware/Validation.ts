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


export function validationRegistration(req: Request, res: Response, next: NextFunction) {
   const registrationData = req.body;

   registrationValidation(registrationData);

   next();
}

export function validationUpdate(req: Request, res: Response, next: NextFunction) {
   const updateData = req.body;

   updateValidation(updateData);

   next();
}

export function validationEvents(data: any) {

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
