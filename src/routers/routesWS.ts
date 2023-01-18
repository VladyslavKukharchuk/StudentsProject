import url from 'url';
import ErrorHandler from '../middleware/ErrorHandler';
import { myEmitter } from '../app';
import { EventTypeEnum } from '../config/enums';
import EventsController from '../controllers/EventsController';
import EventService from '../services/EventService';
import User from '../models/User';

const CLIENTS: any = [];

function unicast(userId: number, data: any) {
   CLIENTS[userId].send(JSON.stringify(data));
}

function broadcast(data: any) {
   CLIENTS.forEach((client: any) => {
      client.send(JSON.stringify(data));
   });
}

export default function connection(ws: any, req: any) {
   const { id, accessToken } = url.parse(req.url, true).query;
   const userId = Number(id);

   console.log(id);
   console.log(accessToken);

   EventService.newUserProcessing(userId, accessToken)
      .then(({userClass, ollUsers}) => {
         console.log(userClass)
         // подписываем текущего юзера на вебсокет
         CLIENTS[userId] = ws;
         unicast(userId, `Користувач з ID ${userId} Вдало підлючився.`)

         console.log('успішне підключення');
         ws.send('успішне підключення');
         // отправляем сессии всех активных пользователей
         ws.send(JSON.stringify(ollUsers));

         // отправляем кеш последних 10 сообщений из Redis
      })
      .catch((err) => {
         console.log(err);
         ws.close()
      });


   ws.on('message', (data: any) => {
      switch (data.type) {
         // атака
         // {
         //    "type": EventTypeEnum;
         //    "userId": number;
         // }
         case EventTypeEnum.attack:
            return EventsController.attack(data.userId, userId);
         // применение способности
         // {
         //    "type": EventTypeEnum;
         //    "userId": number;
         // }
         case EventTypeEnum.ability:
            return EventsController.ability(data.userId, userId);
         // сообщение
         // {
         //    "type": EventTypeEnum;
         //    "message": string;
         // }
         case EventTypeEnum.message:
            return EventsController.message(data.message, userId);
         // возрождение
         // {
         //    "type": EventTypeEnum;
         // }
         case EventTypeEnum.restore:
            return EventsController.restore(userId);
         default:

      }

      console.log(data);
      ws.send(data);
   });


   // отключение
   ws.on('close', () => {
      // удаляем сессию из mongodb
      User.deleteOne({_id: userId});
      // убираем юзера из подписчиков ws сервера
      delete CLIENTS[userId];
   });
}

export { CLIENTS, broadcast, unicast };