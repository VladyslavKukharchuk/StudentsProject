import EventService from '../services/EventService';
import { broadcast, CLIENTS } from '../webSockets';
import url from 'url';
import { WebSocket } from 'ws';
import MongoRepository from '../repositories/MongoRepository';

const eventService = new EventService(new MongoRepository());

// подключение
// подписываем текущего юзера на вебсокет
// отправляем сессии всех активных пользователей
// отправляем кеш последних 10 сообщений из Redis
export async function setConnection(ws: WebSocket, req: any) {
  const parsedUrl = url.parse(req.url, true).query;
  const id = Number(parsedUrl.id);
  const accessToken = req.headers.authorization;
  await eventService.connection(accessToken, id).then(({ ollUsers, messages }) => {
    // подписываем текущего юзера на вебсокет
    CLIENTS.push({ id, ws });

    // отправляем сессии всех активных пользователей
    ws.send(JSON.stringify({ type: 'ollUsers', users: ollUsers }));

    // отправляем кеш последних 10 сообщений из Redis
    ws.send(JSON.stringify({ type: 'previousMessages', messages: messages }));
  });
}

// атака
//  Возвращаем измененную сессию целевого юзера всем подписчикам
export async function useAttack(targetUserId: number, currentUserId: number) {
  await eventService
    .attack(targetUserId, currentUserId)
    .then((targetUser) => broadcast({ type: 'updatedUser', userData: targetUser }));
}

// применение способности
//  Возвращаем измененную сессию целевого юзера всем подписчикам
export async function useAbility(targetUserId: number, currentUserId: number) {
  await eventService.ability(targetUserId, currentUserId).then((targetUser) =>
    broadcast({
      type: 'updatedUser',
      userData: targetUser,
    }),
  );
}

// сообщение
//  Отправляем сообщение всем подписчикам
export async function sendMessage(userMessage: string, currentUserId: number) {
  await eventService.message(userMessage, currentUserId).then((message) =>
    broadcast({
      type: 'message',
      message: message,
    }),
  );
}

// возрождение
// Возвращаем обновленную сессию целевого юзера всем подписчикам
export async function useRestore(currentUserId: number) {
  await eventService.restore(currentUserId).then((currentUser) =>
    broadcast({
      type: 'updatedUser',
      userData: currentUser,
    }),
  );
}
