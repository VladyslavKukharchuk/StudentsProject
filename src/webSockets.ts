import url from 'url';
import routerWs from './routers/routesWS';
import { errorHandlerWs } from './middleware/ErrorHandler';
import { validationEvents } from './middleware/Validation';
import { setConnection } from './controllers/EventsController';
import { deletedUserByIdMg } from './repositories/MongoRepository';

type Client = {
   id: number,
   ws: any
}

export const CLIENTS: Client[] = [];

export function broadcast(data: any): void {
   CLIENTS.forEach((client: Client) => {
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

   setConnection(ws, req)
      .catch((err) => {
         errorHandlerWs(err, ws);
         ws.close();
      });


   ws.on('message', (input: any) => {
      try {
         const userInput = jsonIsObject(input);
         validationEvents(userInput);
         routerWs(userInput, userId, ws);
      } catch (e) {
         errorHandlerWs(e, ws);
      }
   });


   // отключение
   ws.on('close', async () => {
      // удаляем сессию из mongodb
      await deletedUserByIdMg(userId);
      // убираем юзера из подписчиков ws сервера
      const clientIndex = CLIENTS.findIndex(client => client.id === userId);
      CLIENTS.splice(clientIndex, 1);
   });
}