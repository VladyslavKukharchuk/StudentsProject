import EventService from '../services/EventService';
import { broadcast, unicast } from '../routers/routesWS';
import Event from '../middleware/event';
import { myEmitter } from '../app';
import Character from '../characterClasses/character';

class EventsController {

   // атака
   //  Возвращаем измененную сессию целевого юзера всем подписчикам
   static async attack(userClass: Character, targetUserId: number, currentUserId: number) {
      await EventService.attack(userClass, targetUserId, currentUserId)
         .then((targetUser) => broadcast(targetUser))
         .catch((err) => console.log(err));
   }

   // применение способности
   //  Возвращаем измененную сессию целевого юзера всем подписчикам
   static async ability(userClass: Character, targetUserId: number, currentUserId: number) {
      await EventService.ability(userClass, targetUserId, currentUserId)
         .then((targetUser) => broadcast(targetUser))
         .catch((err) => console.log(err));
   }

   // сообщение
   //  Отправляем сообщение всем подписчикам
   static async message(message: string, currentUserId: number) {
      await EventService.message(message, currentUserId)
         .then((message) => broadcast(message))
         .catch((err) => console.log(err));
   }

   // возрождение
   // Возвращаем обновленную сессию целевого юзера всем подписчикам
   static async restore (userClass: Character, currentUserId: number) {
      await EventService.restore(userClass, currentUserId)
         .then((currentUser) => broadcast(currentUser))
         .catch((err) => console.log(err));
   }

}

export default EventsController;
