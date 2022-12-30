import { EventService } from '../services/EventService';
import { Event } from '../middleware/event';
import { EventEmitter } from 'events';
import { errorHandlerWS } from '../middleware/errorHandler';
const myEmitter = new EventEmitter();

class EventsController {
   // получаем класс юзера
   // создаем сессию в mongodb{
   //  "_id": number;
   //  "username": string;
   //  "hp": number;
   //  "statuses": number[];
   // }
   // подписываем текущего юзера на вебсокет
   // отправляем сессии всех активных пользователей
   // отправляем кеш последних 10 сообщений из Redis
   static connection(io: any, socket: any) {
      console.log(`A new user with id: ${socket.id} has connected.`);
      socket.send('You have successfully connected');

      // получать и различать события

      //примітивний middleware
      socket.use(Event.forOll);

      // атака
      // {
      //     "userId": number;
      // }
      socket.on('attack', async (req: any) => {
         // // атака
         // //  Возвращаем измененную сессию целевого юзера всем подписчикам
         await EventService.attack(req.userId)
            .then((updatedUser) => io.sockets.emit('message', updatedUser))
            .catch((err) => {
               myEmitter.emit('error', err);
               // throw new Error(err);
            });
      });

      // применение способности
      // {
      //     "userId": number;
      // }
      socket.on('ability', async (req: any) => {
         // применение способности
         //  Возвращаем измененную сессию целевого юзера всем подписчикам
         await EventService.ability(req.userId)
            .then((updatedUser) => io.sockets.emit('message', updatedUser))
            .catch((err) => {
               myEmitter.emit('error', err);
               // throw new Error(err);
            });
      });

      // сообщение
      // {
      //     "message": string;
      // }
      socket.on('message', async (req: any) => {
         // сообщение
         //  Отправляем сообщение всем подписчикам
         await EventService.message(req.message)
            .then((message) => io.sockets.emit('message', message))
            .catch((err) => {
               myEmitter.emit('error', err);
               // throw new Error(err);
            });
      });

      // возрождение
      // {
      // }
      socket.on('restore', async () => {
         // возрождение
         //  Возвращаем обновленную сессию целевого юзера всем подписчикам
         await EventService.restore()
            .then((updatedUser) => socket.emit('ability', updatedUser))
            .catch((err) => {
               myEmitter.emit('error', err);
               // throw new Error(err);
            });
      });

      myEmitter.on('error', (err) => {
         console.log('Відбулася помилка');
         errorHandlerWS(err, socket);
      });

      // отключение
      // удаляем сессию из mongodb
      // убираем юзера из подписчиков ws сервера
      socket.on('disconnect', (reason: any) => {
         console.log(reason);
      });
   }
}

export { EventsController, myEmitter };
