import url from 'url';
import ErrorHandler from '../middleware/ErrorHandler';
import { myEmitter } from '../app';
import { EventTypeEnum } from '../config/enums';
import EventsController from '../controllers/EventsController';
import EventService from '../services/EventService';
import User from '../models/User';
import Character from '../characterClasses/character';


type Client = {
   userId: number,
   ws: any
}

export const CLIENTS: Client[] = [];

export function unicast(userId: number, data: any): void {
   CLIENTS.forEach((client: any) => {
      if (client.userId === userId) {
         client.ws.send(JSON.stringify(data));
      }
   });
}

export function broadcast(data: any): void {
   CLIENTS.forEach((client: any) => {
      client.ws.send(JSON.stringify(data));
   });
}

export default function connection(ws: any, req: any) {
   const accessToken = req.headers.authorization;
   const { id } = url.parse(req.url, true).query;
   const userId = Number(id);

   let userClass: Character;

   EventService.newUserProcessing(userId, accessToken)
      .then((data) => {
         userClass = data.userClass;

         console.log(`Користувач з ID ${userId} Вдало підлючився.`);

         // подписываем текущего юзера на вебсокет
         CLIENTS.push({ userId, ws });

         // отправляем сессии всех активных пользователей
         ws.send(JSON.stringify(data.ollUsers));

         // отправляем кеш последних 10 сообщений из Redis
      })
      .catch((err) => {
         console.log(err);
         ws.close();
      });


   ws.on('message', (input: any) => {
      const data = JSON.parse(input);
      console.log(data);

      switch (data.type) {
         // атака
         // {
         //    "type": EventTypeEnum;
         //    "userId": number;
         // }
         case EventTypeEnum.attack:
            return EventsController.attack(userClass, data.userId, userId);
         // применение способности
         // {
         //    "type": EventTypeEnum;
         //    "userId": number;
         // }
         case EventTypeEnum.ability:
            return EventsController.ability(userClass, data.userId, userId);
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
            return EventsController.restore(userClass, userId);
         default:
            throw new Error('You have entered unknown action type');
      }
   });


   // отключение
   ws.on('close', async () => {
      // удаляем сессию из mongodb
      await User.deleteOne({ _id: userId });
      // убираем юзера из подписчиков ws сервера
      let clientIndex = CLIENTS.findIndex(client => client.userId === userId);
      CLIENTS.splice(clientIndex, 1);
   });
}