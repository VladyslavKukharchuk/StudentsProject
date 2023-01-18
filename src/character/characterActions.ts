class CharacterActions {
   static useAttack(userClass: any, target: any, hero: any) {
      if (hero.hp === 0) {
         throw new Error("You are dead, if you want to continue the fight, first relive!");
      }

      if (target.hp === 0) {
         throw new Error("Your opponent is already dead, you can attack another!");
      }

      return userClass.attack(target);
   }

   static useAbility(userClass: any, target: any, hero: any) {
      if (hero.hp === 0) {
         throw new Error("You are dead, if you want to continue the fight, first relive!");
      }

      return userClass.ability(target, hero);
   }

   static useRelive(userClass: any, hero: any) {
      if (hero.hp !== 0) {
         throw new Error("Your character is still alive, you can continue the battle!");
      }

      userClass.relive();
   }
}

export default CharacterActions;
