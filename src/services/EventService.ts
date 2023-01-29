import { authenticationWs } from '../middleware/Authentication';
import { getUserClassByIdPg } from '../repositories/UsersRepository';
import CharacterCreator from '../character/characterCreator';
import CharacterActions from '../character/characterActions';
import { BadRequest, UnauthorizedError } from '../exceptions/ApiError';

import {
   createUserMg,
   getUserByIdMg,
   getAllUsersMg,
   updateUserHpMg,
   updateUserStatusesMg,
   deletedUserByIdMg,
} from '../repositories/MongoRepository';

export async function connection(accessToken: string, id: number) {
   // проверяем jwt токен.
   const userData = authenticationWs(accessToken);
   // @ts-ignore
   if(userData.id !== id){
      throw new UnauthorizedError;
   }

   //  получаем класс текущего юзера из postgres
   const classData = await getUserClassByIdPg(id);
   if (!classData) {
      throw new BadRequest('User with this id does not exist');
   }

   // создаем сессию в mongodb
   await createUserMg({ _id: id, username: classData.username, hp: classData.health, statuses: [] });

   const ollUsers = await getAllUsersMg();

   return ollUsers;
}

// Действия
// атака
export async function attack(targetUserId: number, currentUserId: number) {
   //  получаем сессию текущего юзера из mongo
   const currentUser = await getUserByIdMg(currentUserId);

   //  получаем сессию целевого юзера из mongo
   const targetUser = await getUserByIdMg(targetUserId);

   if (!targetUser) {
      throw new BadRequest('Failed to Attack, maybe your target has already left the fight');
   }

   //  получаем класс текущего юзера из postgres
   const classData = await getUserClassByIdPg(currentUserId);
   const userClass = CharacterCreator.createCharacter(classData.class_id, classData);

   //  проверяем действующие статусы на целевом юзере и возможно ли провести атаку.
   const targetUserHp = CharacterActions.useAttack(userClass, targetUser, currentUser);
   //  Если нет возвращаем ошибку автору
   //  Уменьшаем здоровье целевого юзера и сохраняем изменения в сессии.
   // @ts-ignore
   const user = await updateUserHpMg(targetUserId, targetUserHp);

   return user;
}

// применение способности
export async function ability(targetUserId: number, currentUserId: number) {

   //  получаем сессию текущего юзера из mongo
   const currentUser = await getUserByIdMg(currentUserId);

   //  получаем сессию целевого юзера из mongo
   const targetUser = await getUserByIdMg(targetUserId);

   if (!targetUser) {
      throw new BadRequest('Ability failed, your target may have already left the battle');
   }

   //  получаем класс текущего юзера из postgres
   const classData = await getUserClassByIdPg(currentUserId);
   const userClass = CharacterCreator.createCharacter(classData.class_id, classData);

   const targetUserStatus = CharacterActions.useAbility(userClass, targetUser, currentUser);

   //  Добавляем статус целевому юзеру и сохраняем изменения в сессии.

   async function removeEffectOfAbility(userID: number, targetStatus: number) {
      const user = await getUserByIdMg(userID);
      if (user) {
         const statusIndex = user.statuses.findIndex((status: number) => status === targetStatus);
         user.statuses.splice(statusIndex, 1);
         await updateUserStatusesMg(userID, user.statuses);
      }
   }

   setTimeout(removeEffectOfAbility, 30 * 1000, targetUserId, targetUserStatus);

   targetUser.statuses.push(targetUserStatus);

   const updatedUser = await updateUserStatusesMg(targetUserId, targetUser.statuses);

   return updatedUser;
}

// сообщение
export async function message(message: string, currentUserId: number) {
   //  Проверяем может ли юзер писать сообщения

   //  получаем сессию текущего юзера из mongo
   const currentUser = await getUserByIdMg(currentUserId);

   // @ts-ignore
   if (currentUser.hp === 0) {
      //  Если нет возвращаем ошибку автору
      throw new BadRequest('You are dead, if you want to write message, first relive!');
   }

   return message;
}

// возрождение
export async function restore(currentUserId: number) {
   //  Проверяем нужно ли юзеру возрождение
   const currentUser = await getUserByIdMg(currentUserId);

   // @ts-ignore
   if (currentUser.hp !== 0) {
      //  Если нет возвращаем ошибку автору
      throw new BadRequest('Your character is still alive, you can continue the battle!');
   }

   //  получаем класс текущего юзера из postgres
   const classData = await getUserClassByIdPg(currentUserId);

   await deletedUserByIdMg(currentUserId);

   await createUserMg({ _id: currentUserId, username: classData.username, hp: classData.health, statuses: [] });

   const user = await getUserByIdMg(currentUserId);
   return user;
}
