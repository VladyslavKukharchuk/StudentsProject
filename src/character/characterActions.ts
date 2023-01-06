class CharacterActions {
   static useAttack(hero: any, enemy: any): number | undefined {
      if (hero.characterHP === 0) {
         throw new Error("You are dead, if you want to continue the fight, first relive!");
      }

      if (enemy.characterHP === 0) {
         throw new Error("Your opponent is already dead, you can attack another!");
      }

      if (enemy.characterHP - hero.characterAP < 0) {
         return hero.finishTheEnemy(enemy);
      }

      hero.attack(enemy);
   }

   static useAbility(hero: any): void {
      if (hero.characterHP === 0) {
         throw new Error("You are dead, if you want to continue the fight, first relive!");
      }

      hero.ability();
   }

   static useRelive(hero: any): void {
      if (hero.characterHP !== 0) {
         throw new Error("Your character is still alive, you can continue the battle!!!");
      }

      hero.relive();
   }
}

export default CharacterActions;
