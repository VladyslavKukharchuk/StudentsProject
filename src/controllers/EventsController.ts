import EventService from '../services/EventService';
import { broadcast , CLIENTS } from '../webSockets';
import url from 'url';

class EventsController {

   // подключение
   // подписываем текущего юзера на вебсокет
   // отправляем сессии всех активных пользователей
   // отправляем кеш последних 10 сообщений из Redis
   static async connection(ws: any, req: any) {
      const parsedUrl = url.parse(req.url, true).query;
      const id = Number(parsedUrl.id);
      const accessToken = req.headers.authorization;
      await EventService.connection(accessToken, id)
         .then(ollUsers => {
            // подписываем текущего юзера на вебсокет
            CLIENTS.push({ id, ws });

            // отправляем сессии всех активных пользователей
            ws.send(JSON.stringify(ollUsers));

            // отправляем кеш последних 10 сообщений из Redis

         })
         .catch((err) => {
            throw err;
         });
   }

   // атака
   //  Возвращаем измененную сессию целевого юзера всем подписчикам
   static async attack(targetUserId: number, currentUserId: number) {
      await EventService.attack(targetUserId, currentUserId)
         .then((targetUser) => broadcast(targetUser))
         .catch((err) => {
            throw err;
         });
   }

   // применение способности
   //  Возвращаем измененную сессию целевого юзера всем подписчикам
   static async ability(targetUserId: number, currentUserId: number) {
      await EventService.ability(targetUserId, currentUserId)
         .then((targetUser) => broadcast(targetUser))
         .catch((err) => {
            throw err;
         });
   }

   // сообщение
   //  Отправляем сообщение всем подписчикам
   static async message(message: string, currentUserId: number) {
      await EventService.message(message, currentUserId)
         .then((message) => broadcast(message))
         .catch((err) => {
            throw err;
         });
   }

   // возрождение
   // Возвращаем обновленную сессию целевого юзера всем подписчикам
   static async restore(currentUserId: number) {
      await EventService.restore(currentUserId)
         .then((currentUser) => broadcast(currentUser))
         .catch((err) => {
            throw err;
         });
   }

}

export default EventsController;
