import User from '../models/User';
import Authentication from '../middleware/Authentication';
import UsersRepository from '../repositories/UsersRepository';
import CharacterCreator from '../character/characterCreator';
import CharacterActions from '../character/characterActions';
import Character from '../characterClasses/character';
import { BadRequest } from '../exceptions/ApiError';


class EventService {
   static async connection(accessToken: string, id: number){
      // проверяем jwt токен.
      Authentication.ws(accessToken);

      //  получаем класс текущего юзера из postgres
      const classData = await UsersRepository.getUserClassByID(id);
      if (!classData){
         throw new BadRequest("User with this id does not exist")
      }

      // создаем сессию в mongodb{
      //  "_id": number;
      //  "username": string;
      //  "hp": number;
      //  "statuses": number[];
      // }
      await User.create({ _id: id, username: classData.username, hp: classData.health });

      const ollUsers = await User.find({});

      return {ollUsers};
   }

   // Действия
   // атака
   static async attack(targetUserId: number, currentUserId: number) {
      //  получаем сессию текущего юзера из mongo
      const currentUser = await User.findById(currentUserId);

      //  получаем сессию целевого юзера из mongo
      const targetUser = await User.findById(targetUserId);
      if(!targetUser){
         throw new BadRequest("Failed to Attack, maybe your target has already left the fight")
      }

      //  получаем класс текущего юзера из postgres
      const classData = await UsersRepository.getUserClassByID(currentUserId);
      const userClass = CharacterCreator.createCharacter(classData.class_id, classData);

      //  проверяем действующие статусы на целевом юзере и возможно ли провести атаку.
      const targetUserHp = CharacterActions.useAttack(userClass, targetUser, currentUser);
      //  Если нет возвращаем ошибку автору
      //  Уменьшаем здоровье целевого юзера и сохраняем изменения в сессии.
      // @ts-ignore
      targetUser.hp = targetUserHp;
      // @ts-ignore
      await targetUser.save()

      return targetUser;
   }

   // применение способности
   static async ability(targetUserId: number, currentUserId: number) {

      //  получаем сессию текущего юзера из mongo
      const currentUser = await User.findById(currentUserId);

      //  получаем сессию целевого юзера из mongo
      const targetUser = await User.findById(targetUserId);
      if(!targetUser){
         throw new BadRequest("Ability failed, your target may have already left the battle")
      }

      //  получаем класс текущего юзера из postgres
      const classData = await UsersRepository.getUserClassByID(currentUserId);
      const userClass = CharacterCreator.createCharacter(classData.class_id, classData);

      const targetUserStatus = CharacterActions.useAbility(userClass, targetUser, currentUser);
      //  Добавляем статус целевому юзеру и сохраняем изменения в сессии.
      // @ts-ignore
      targetUser.statuses.push(targetUserStatus)
      // @ts-ignore
      await targetUser.save();

      async function removeEffectOfAbility(userID: any, targetStatus: number){
         const user = await User.findById(userID);
         if(user){
            let statusIndex = user.statuses.findIndex((status: number) => status === targetStatus);
            user.statuses.splice(statusIndex, 1);
            await user.save();
         }
      }

      setTimeout(removeEffectOfAbility, 30 * 1000, targetUserId, targetUserStatus);

      return targetUser;
   }

   // сообщение
   static async message(message: string, currentUserId: number) {
      //  Проверяем может ли юзер писать сообщения
      const currentUser = await User.findById(currentUserId);
      // @ts-ignore
      if(currentUser.hp === 0){
         //  Если нет возвращаем ошибку автору
         throw new BadRequest("You are dead, if you want to write message, first relive!");
      }

      return message;
   }

   // возрождение
   static async restore(currentUserId: number) {
      //  Проверяем нужно ли юзеру возрождение
      const currentUser = await User.findById(currentUserId);

      // @ts-ignore
      if(currentUser.hp !== 0){
         //  Если нет возвращаем ошибку автору
         throw new BadRequest("Your character is still alive, you can continue the battle!");
      }

      //  получаем класс текущего юзера из postgres
      const classData = await UsersRepository.getUserClassByID(currentUserId);
      const userClass = CharacterCreator.createCharacter(classData.class_id, classData);

      const currentUserHp = CharacterActions.useRelive(userClass, currentUser)
      //  Пересоздаем сессию в mongo
      // @ts-ignore
      currentUser.hp = currentUserHp;
      // @ts-ignore
      currentUser.save();

      return currentUser;
   }
}

export default EventService;
