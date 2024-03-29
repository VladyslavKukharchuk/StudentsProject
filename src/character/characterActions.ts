import { UserStatusesEnum } from '../config/enums';
import Character from '../characterClasses/character';
import { BadRequest } from '../exceptions/ApiError';

class CharacterActions {
   static useAttack(userClass: Character, target: any, hero: any) {
      if (target.id === hero.id) {
         throw new BadRequest('The attack can only be used on enemies!');
      }
      console.log(target)

      if (hero.hp === 0) {
         throw new BadRequest('You are dead, if you want to continue the fight, first relive!');
      }

      if (target.hp === 0) {
         throw new BadRequest('Your opponent is already dead, you can attack another!');
      }

      if (target.statuses.includes(UserStatusesEnum.Escape)) {
         throw new BadRequest('The enemy in hiding, now impossible to attack him');
      }
      switch (userClass.name) {
         case 'Thief':
            if (target.statuses.includes(UserStatusesEnum.Defense)) {
               throw new BadRequest('The enemy is Defended, it is now impossible to attack him');
            }

            return userClass.attack(target);
         case 'Mage':
            return userClass.attack(target);
         case 'Warrior':
            if (target.statuses.includes(UserStatusesEnum.Enchant)) {
               throw new BadRequest('The enemy is Defended, it is now impossible to attack him');
            }

            return userClass.attack(target);
      }
   }

   static useAbility(userClass: any, target: any, hero: any) {
      if (hero.hp === 0) {
         throw new BadRequest('You are dead, if you want to continue the fight, first relive!');
      }

      if (hero.statuses.includes(UserStatusesEnum.Enchant)) {
         throw new BadRequest('You have been enchanted, now you will not be able to use your abilities');
      }

      switch (userClass.name) {
         case 'Thief':
            if (target.id !== hero.id) {
               throw new BadRequest('The ability can only be used on yourself!');
            }

            return userClass.ability();
         case 'Mage':
            if (target.id === hero.id) {
               throw new BadRequest('The ability can only be used on enemies!');
            }

            if (target.statuses.includes(UserStatusesEnum.Escape)) {
               throw new BadRequest('The enemy in hiding, now impossible to attack him');
            }

            if (target.hp === 0) {
               throw new BadRequest('Your opponent is already dead, you can use the ability on another!');
            }

            return userClass.ability();
         case 'Warrior':
            if (target.id !== hero.id) {
               throw new BadRequest('The ability can only be used on yourself!');
            }

            return userClass.ability();
      }
   }

   static useRelive(userClass: any, hero: any) {
      if (hero.hp !== 0) {
         throw new BadRequest('Your character is still alive, you can continue the battle!');
      }

      return userClass.relive();
   }
}

export default CharacterActions;
