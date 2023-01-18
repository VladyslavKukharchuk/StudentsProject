import UserRepository from '../repositories/UsersRepository';
import User from '../models/User';
import { UserStatusesEnum } from '../config/enums';
import Authentication from '../middleware/Authentication';
import UsersRepository from '../repositories/UsersRepository';
import CharacterCreator from '../character/characterCreator';
import CharacterActions from '../character/characterActions';

class EventService {
   static async newUserProcessing(userId: number, accessToken: string | string[] | undefined){
      // проверяем jwt токен.
      Authentication.ws(accessToken)

      // получаем класс юзера
      const userClass = await UsersRepository.getUserClassByID(userId);

      // создаем сессию в mongodb{
      //  "_id": number;
      //  "username": string;
      //  "hp": number;
      //  "statuses": number[];
      // }
      await User.create({ _id: userId, username: userClass.username, hp: userClass.health });
      const ollUsers = await User.find({});
      return {userClass, ollUsers};
   }

   // Действия
   // атака
   static async attack(targetUserId: number, currentUserId: number) {
      //  получаем класс текущего юзера из postgres
      const { class_id, health, damage, attack_type, ability } = await UserRepository.getUserClassByID(currentUserId);
      const currentUserClass = CharacterCreator.createCharacter(class_id, {health, damage, attack_type, ability})

      //  получаем сессию текущего юзера из mongo
      const currentUser = await User.findById(currentUserId);

      //  получаем сессию целевого юзера из mongo
      const targetUser = await User.findById(targetUserId);


      //  проверяем действующие статусы на целевом юзере и возможно ли провести атаку.
      const targetUserHp = CharacterActions.useAttack(currentUserClass, targetUser, currentUser);
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
      //  получаем класс текущего юзера из postgres
      const { class_id, health, damage, attack_type, ability } = await UserRepository.getUserClassByID(currentUserId);
      const currentUserClass = CharacterCreator.createCharacter(class_id, {health, damage, attack_type, ability})

      //  получаем сессию текущего юзера из mongo
      const currentUser = await User.findById(currentUserId);

      //  получаем сессию целевого юзера из mongo
      const targetUser = await User.findById(targetUserId);


      const targetUserStatus = CharacterActions.useAbility(currentUserClass, targetUser, currentUser);
      //  Если нет возвращаем ошибку автору
      //  Добавляем статус целевому юзеру и сохраняем изменения в сессии.
      // @ts-ignore
      targetUser.statuses = targetUser.statuses.push(targetUserStatus)

      //  Возвращаем измененную сессию целевого юзера всем подписчикам
      // @ts-ignore
      await targetUser.save();

      return targetUser;
   }

   // сообщение
   static async message(message: string, currentUserId: number) {
      //  Проверяем может ли юзер писать сообщения
      const currentUser = await User.findById(currentUserId);
      // @ts-ignore
      if(currentUser.hp === 0){
         //  Если нет возвращаем ошибку автору
         throw new Error("You are dead, if you want to write message, first relive!");
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
         throw new Error("Your character is still alive, you can continue the battle!");
      }

      //  Если да получаем класс текущего юзера из postgres
      const { class_id, health, damage, attack_type, ability } = await UserRepository.getUserClassByID(currentUserId);
      const currentUserClass  = CharacterCreator.createCharacter(class_id, {health, damage, attack_type, ability})


      const currentUserHp = CharacterActions.useRelive(currentUserClass, currentUser)
      //  Пересоздаем сессию в mongo

      //  Возвращаем обновленную сессию целевого юзера всем подписчикам
      console.log("User used restore.");
   }
}

export default EventService;
