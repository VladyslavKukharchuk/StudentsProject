import Character from "./character";

class Thief extends Character {
   constructor() {
      super();
      this.healthPoint = 100;
      this.maxHP = 100;
      this.attackPower = 25;
      this.class = "Thief";
      this.attackName = "Archery Shot";
      this.abilityName = "Run Away";
   }

   ability(): void {}
}

export default Thief;
