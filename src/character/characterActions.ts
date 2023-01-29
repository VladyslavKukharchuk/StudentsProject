import { UserStatusesEnum } from '../config/enums';
import Character from '../characterClasses/character';
import { BadRequest } from '../exceptions/ApiError';

class CharacterActions {
   static useAttack(userClass: Character, target: any, hero: any) {
      if (target._id === hero._id) {
         throw new BadRequest('The attack can only be used on enemies!');
      }

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
            if (target._id !== hero._id) {
               throw new BadRequest('The ability can only be used on yourself!');
            }

            if (target.statuses.includes(UserStatusesEnum.Escape)) {
               throw new BadRequest('Your ability is still active, you can use it again after the effect ends');
            }

            return userClass.ability();
         case 'Mage':
            if (target._id === hero._id) {
               throw new BadRequest('The ability can only be used on enemies!');
            }

            if (target.hp === 0) {
               throw new BadRequest('Your opponent is already dead, you can use the ability on another!');
            }

            if (target.statuses.includes(UserStatusesEnum.Escape)) {
               throw new BadRequest('The enemy in hiding, now impossible to attack him');
            }

            if (target.statuses.includes(UserStatusesEnum.Enchant)) {
               throw new BadRequest('Your opponent has already been enchanted, you can use the ability on another!');
            }

            return userClass.ability();
         case 'Warrior':
            if (target._id !== hero._id) {
               throw new BadRequest('The ability can only be used on yourself!');
            }

            if (target.statuses.includes(UserStatusesEnum.Defense)) {
               throw new BadRequest('Your ability is still active, you can use it again after the effect ends');
            }

            return userClass.ability();
      }
   }
}

export default CharacterActions;
