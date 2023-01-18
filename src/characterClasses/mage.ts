import { UserStatusesEnum } from '../config/enums';

class Mage {
   hp: number;
   damage: number;
   attackName: string;
   abilityName: string;

   constructor(health: number, damage: number, attackName: string, abilityName: string) {
      this.hp = health;
      this.damage = damage;
      this.attackName = attackName;
      this.abilityName = abilityName;
   }

   attack(target: any) {
      if(target.statuses.include(UserStatusesEnum.inHiding)){
         throw new Error("The enemy has in hiding, now impossible to attack him");
      }

      if (target.hp - this.damage <= 0) {
         return 0;
      }

      return target.hp - this.damage;
   }

   ability(target: any, hero: any) {
      if(hero.statuses.include(UserStatusesEnum.enchanted)){
         throw new Error("You have been enchanted, now you will not be able to use your abilities");
      }

      if (target.hp === 0) {
         throw new Error("Your opponent is already dead, you can use the ability on another!");
      }

      return UserStatusesEnum.enchanted;
   }

   relive() {
      return this.hp;
   }
}

export default Mage;
