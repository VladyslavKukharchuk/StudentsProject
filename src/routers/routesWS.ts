import { EventTypeEnum } from '../config/enums';
import EventsController from '../controllers/EventsController';
import ErrorHandler from '../middleware/ErrorHandler';
import Character from '../characterClasses/character';

export default function routerWs(userInput: any, userClass: Character, userId: number, ws: any){
   switch (userInput.type) {
      case EventTypeEnum.attack:
         EventsController.attack(userClass, userInput.userId, userId).catch((e) => ErrorHandler.ws(e, ws));
         break;
      case EventTypeEnum.ability:
         EventsController.ability(userClass, userInput.userId, userId).catch((e) => ErrorHandler.ws(e, ws));
         break;
      case EventTypeEnum.message:
         EventsController.message(userInput.message, userId).catch((e) => ErrorHandler.ws(e, ws));
         break;
      case EventTypeEnum.restore:
         EventsController.restore(userClass, userId).catch((e) => ErrorHandler.ws(e, ws));
         break;
   }
}