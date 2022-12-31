import { Character } from "./character";

class Warrior extends Character {
   constructor() {
      super();
      this.healthPoint = 200;
      this.maxHP = 200;
      this.attackPower = 50;
      this.class = "Warrior";
      this.attackName = "Sword Strike";
      this.abilityName = "Defense";
   }

   ability(): void {}
}

export { Warrior };
