import { EventTypeEnum } from '../config/enums';
import EventsController from '../controllers/EventsController';
import ErrorHandler from '../middleware/ErrorHandler';

export default function routerWs(userInput: any, userId: number, ws: any){
   switch (userInput.type) {
      case EventTypeEnum.attack:
         EventsController.attack(userInput.userId, userId).catch((e) => ErrorHandler.ws(e, ws));
         break;
      case EventTypeEnum.ability:
         EventsController.ability(userInput.userId, userId).catch((e) => ErrorHandler.ws(e, ws));
         break;
      case EventTypeEnum.message:
         EventsController.message(userInput.message, userId).catch((e) => ErrorHandler.ws(e, ws));
         break;
      case EventTypeEnum.restore:
         EventsController.restore(userId).catch((e) => ErrorHandler.ws(e, ws));
         break;
   }
}