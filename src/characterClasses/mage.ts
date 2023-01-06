import Character from "./character";

class Mage extends Character {
   constructor() {
      super();
      this.healthPoint = 80;
      this.maxHP = 80;
      this.attackPower = 100;
      this.class = "Mage";
      this.attackName = "Fireball";
      this.abilityName = "Bewitch";
   }

   ability(): void {}
}

export default Mage;
