import User from '../interfaces/User';

abstract class Character {
   readonly name: string;
   readonly hp: number;
   readonly damage: number;
   readonly attackName: string;
   readonly abilityName: string;

   constructor(name: string, health: number, damage: number, attackName: string, abilityName: string) {
      this.name = name;
      this.hp = health;
      this.damage = damage;
      this.attackName = attackName;
      this.abilityName = abilityName;
   }

   attack(target: User): number {
      if (target.hp - this.damage <= 0) {
         return 0;
      }

      return target.hp - this.damage;
   }

   abstract ability(): number;
}

export default Character;
