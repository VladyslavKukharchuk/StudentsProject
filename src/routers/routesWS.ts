import { EventTypeEnum } from '../config/enums';
import { useAttack, useAbility, sendMessage, useRestore } from '../controllers/EventsController';
import { errorHandlerWs } from '../middleware/ErrorHandler';

export default function routerWs(userInput: any, userId: number, ws: any){
   switch (userInput.type) {
      case EventTypeEnum.attack:
         useAttack(userInput.userId, userId).catch((e) => errorHandlerWs(e, ws));
         break;
      case EventTypeEnum.ability:
         useAbility(userInput.userId, userId).catch((e) => errorHandlerWs(e, ws));
         break;
      case EventTypeEnum.message:
         sendMessage(userInput.message, userId).catch((e) => errorHandlerWs(e, ws));
         break;
      case EventTypeEnum.restore:
         useRestore(userId).catch((e) => errorHandlerWs(e, ws));
         break;
   }
}