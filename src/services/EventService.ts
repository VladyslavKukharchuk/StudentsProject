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

      //  получаем класс текущего юзера из postgres
      const { username, class_id, name, health, damage, attack_type, ability } = await UsersRepository.getUserClassByID(userId);
      const userClass = CharacterCreator.createCharacter(class_id, {health, damage, attack_type, ability})

      // создаем сессию в mongodb{
      //  "_id": number;
      //  "username": string;
      //  "hp": number;
      //  "statuses": number[];
      // }
      await User.create({ _id: userId, username, hp: health });
      const ollUsers = await User.find({});
      return {userClass, ollUsers};
   }

   // Действия
   // атака
   static async attack(userClass: any, targetUserId: number, currentUserId: number) {
      //  получаем класс текущего юзера из postgres
      // const { class_id, health, damage, attack_type, ability } = await UserRepository.getUserClassByID(currentUserId);
      // const currentUserClass = CharacterCreator.createCharacter(class_id, {health, damage, attack_type, ability})

      //  получаем сессию текущего юзера из mongo
      const currentUser = await User.findById(currentUserId);
      console.log(currentUser)


      //  получаем сессию целевого юзера из mongo
      const targetUser = await User.findById(targetUserId);
      console.log(targetUser)

      //  проверяем действующие статусы на целевом юзере и возможно ли провести атаку.
      const targetUserHp = CharacterActions.useAttack(userClass, targetUser, currentUser);
      //  Если нет возвращаем ошибку автору
      //  Уменьшаем здоровье целевого юзера и сохраняем изменения в сессии.
      // @ts-ignore
      targetUser.hp = targetUserHp;
      // @ts-ignore
      await targetUser.save()
      console.log(targetUser)

      return targetUser;
   }

   // применение способности
   static async ability(userClass: any, targetUserId: number, currentUserId: number) {

      //  получаем сессию текущего юзера из mongo
      const currentUser = await User.findById(currentUserId);

      //  получаем сессию целевого юзера из mongo
      const targetUser = await User.findById(targetUserId);

      const targetUserStatus = CharacterActions.useAbility(userClass, targetUser, currentUser);
      //  Если нет возвращаем ошибку автору
      //  Добавляем статус целевому юзеру и сохраняем изменения в сессии.
      // @ts-ignore
      targetUser.statuses.push(targetUserStatus)
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
   static async restore(userClass: any, currentUserId: number) {
      //  Проверяем нужно ли юзеру возрождение
      const currentUser = await User.findById(currentUserId);

      // @ts-ignore
      if(currentUser.hp !== 0){
         //  Если нет возвращаем ошибку автору
         throw new Error("Your character is still alive, you can continue the battle!");
      }

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
