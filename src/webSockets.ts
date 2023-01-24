import url from 'url';
import Character from './characterClasses/character';
import EventService from './services/EventService';
import ErrorHandler from './middleware/ErrorHandler';
import Validation from './middleware/Validation';
import User from './models/User';
import routerWs from './routers/routesWS';

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
         new Error("The received data is not of type object");
      }
      return data;
   } catch (e) {
      throw e;
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
         ErrorHandler.ws(err, ws)
         ws.close();
      });


   ws.on('message', (input: any) => {
      let userInput: any = {};

      try {
         userInput = jsonIsObject(input);
         Validation.events(userInput);
         routerWs(userInput, userClass, userId, ws)

      } catch (e) {
         ErrorHandler.ws(e, ws)
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