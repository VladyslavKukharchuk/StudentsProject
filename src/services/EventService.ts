import { authenticationWs } from '../middleware/Authentication';
import CharacterCreator from '../character/characterCreator';
import CharacterActions from '../character/characterActions';
import { BadRequest, UnauthorizedError } from '../exceptions/ApiError';
import IMongoRepository from '../interfaces/IMongoRepository';
import UsersRepository from '../repositories/UsersRepository';

const usersRepository = new UsersRepository();

export default class EventService {
   constructor(private repository: IMongoRepository) {}

   async connection(accessToken: string, id: number) {
      // проверяем jwt токен.
      const userData = authenticationWs(accessToken);
      // @ts-ignore
      if (userData.id !== id) {
         throw new UnauthorizedError;
      }

      //  получаем класс текущего юзера из postgres
      const classData = await usersRepository.getUserClassById(id);
      if (!classData) {
         throw new BadRequest('User with this id does not exist');
      }

      // создаем сессию в mongodb
      await this.repository.createUser({ _id: id, username: classData.username, hp: classData.health, statuses: [] });

      const ollUsers = await this.repository.getAllUsers();

      return ollUsers;
   }

// Действия
// атака
   async attack(targetUserId: number, currentUserId: number) {
      //  получаем сессию текущего юзера из mongo
      const currentUser = await this.repository.getUserById(currentUserId);

      //  получаем сессию целевого юзера из mongo
      const targetUser = await this.repository.getUserById(targetUserId);

      if (!targetUser) {
         throw new BadRequest('Failed to Attack, maybe your target has already left the fight');
      }

      //  получаем класс текущего юзера из postgres
      const classData = await usersRepository.getUserClassById(currentUserId);
      const userClass = CharacterCreator.createCharacter(classData.class_id, classData);

      //  проверяем действующие статусы на целевом юзере и возможно ли провести атаку.
      const targetUserHp = CharacterActions.useAttack(userClass, targetUser, currentUser);
      //  Если нет возвращаем ошибку автору
      //  Уменьшаем здоровье целевого юзера и сохраняем изменения в сессии.

      const user = await this.repository.updateUserHp(targetUserId, targetUserHp);

      return user;
   }

// применение способности
   async ability(targetUserId: number, currentUserId: number) {

      //  получаем сессию текущего юзера из mongo
      const currentUser = await this.repository.getUserById(currentUserId);

      //  получаем сессию целевого юзера из mongo
      const targetUser = await this.repository.getUserById(targetUserId);

      if (!targetUser) {
         throw new BadRequest('Ability failed, your target may have already left the battle');
      }

      //  получаем класс текущего юзера из postgres
      const classData = await usersRepository.getUserClassById(currentUserId);
      const userClass = CharacterCreator.createCharacter(classData.class_id, classData);

      const targetUserStatus = CharacterActions.useAbility(userClass, targetUser, currentUser);


      const removeEffectOfAbility = async(userID: number, targetStatus: number) => {
         const user = await this.repository.getUserById(userID);
         if (user) {
            const statusIndex = user.statuses.findIndex((status: number) => status === targetStatus);
            user.statuses.splice(statusIndex, 1);
            await this.repository.updateUserStatuses(userID, user.statuses);
         }
      }

      setTimeout(removeEffectOfAbility, 30 * 1000, targetUserId, targetUserStatus);

      targetUser.statuses.push(targetUserStatus);
      //  Добавляем статус целевому юзеру и сохраняем изменения в сессии.
      const updatedUser = await this.repository.updateUserStatuses(targetUserId, targetUser.statuses);

      return updatedUser;
   }

// сообщение
   async message(message: string, currentUserId: number) {
      //  Проверяем может ли юзер писать сообщения

      //  получаем сессию текущего юзера из mongo
      const currentUser = await this.repository.getUserById(currentUserId);

      if (currentUser.hp === 0) {
         //  Если нет возвращаем ошибку автору
         throw new BadRequest('You are dead, if you want to write message, first relive!');
      }

      return message;
   }

// возрождение
   async restore(currentUserId: number) {
      //  Проверяем нужно ли юзеру возрождение
      const currentUser = await this.repository.getUserById(currentUserId);

      if (currentUser.hp !== 0) {
         //  Если нет возвращаем ошибку автору
         throw new BadRequest('Your character is still alive, you can continue the battle!');
      }

      //  получаем класс текущего юзера из postgres
      const classData = await usersRepository.getUserClassById(currentUserId);

      await this.repository.deletedUserById(currentUserId);

      await this.repository.createUser({ _id: currentUserId, username: classData.username, hp: classData.health, statuses: [] });

      const user = await this.repository.getUserById(currentUserId);
      return user;
   }
}