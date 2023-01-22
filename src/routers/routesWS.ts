import url from 'url';
import ErrorHandler from '../middleware/ErrorHandler';
import { myEmitter } from '../app';
import { EventTypeEnum } from '../config/enums';
import EventsController from '../controllers/EventsController';
import EventService from '../services/EventService';
import User from '../models/User';
import Character from '../characterClasses/character';
import Validation from '../middleware/Validation';


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

function jsonIsObject(json: any) {
   try {
      const data = JSON.parse(json);
      if (typeof data !== 'object') {
         new Error();
      }
      return data;
   } catch (e) {
      throw Error('Invalid data format');
   }
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
      let userInput: any = {};

      try {
         userInput = jsonIsObject(input);
         Validation.events(userInput);
      } catch (e) {
         // @ts-ignore
         console.log(e.message);
      }
      console.log(userInput);


      switch (userInput.type) {
         // атака
         // {
         //    "type": EventTypeEnum;
         //    "userId": number;
         // }
         case EventTypeEnum.attack:
            return EventsController.attack(userClass, userInput.userId, userId);
         // применение способности
         // {
         //    "type": EventTypeEnum;
         //    "userId": number;
         // }
         case EventTypeEnum.ability:
            return EventsController.ability(userClass, userInput.userId, userId);
         // сообщение
         // {
         //    "type": EventTypeEnum;
         //    "message": string;
         // }
         case EventTypeEnum.message:
            return EventsController.message(userInput.message, userId);
         // возрождение
         // {
         //    "type": EventTypeEnum;
         // }
         case EventTypeEnum.restore:
            return EventsController.restore(userClass, userId);
         default:
            // throw new Error('You have entered unknown action type');
            console.log('You have entered unknown action type');
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