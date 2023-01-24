import ErrorHandler from './middleware/ErrorHandler';
import Validation from './middleware/Validation';
import User from './models/User';
import routerWs from './routers/routesWS';
import eventsController from './controllers/EventsController';
import url from 'url';

type Client = {
   id: number,
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
         new Error('The received data is not of type object');
      }
      return data;
   } catch (e) {
      throw e;
   }
}

export default function connection(ws: any, req: any) {
   const { id } = url.parse(req.url, true).query;
   const userId = Number(id);

   eventsController.connection(ws, req).catch((err) => {
      ErrorHandler.ws(err, ws);
      ws.close();
   });


   ws.on('message', (input: any) => {
      let userInput: any = {};

      try {
         userInput = jsonIsObject(input);
         Validation.events(userInput);
         routerWs(userInput, userId, ws);

      } catch (e) {
         ErrorHandler.ws(e, ws);
      }
   });


   // отключение
   ws.on('close', async () => {
      // удаляем сессию из mongodb
      await User.deleteOne({ _id: userId });
      // убираем юзера из подписчиков ws сервера
      let clientIndex = CLIENTS.findIndex(client => client.id === userId);
      CLIENTS.splice(clientIndex, 1);
   });
}