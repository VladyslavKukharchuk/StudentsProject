abstract class Character {
   // @ts-ignore
   protected healthPoint: number;
   // @ts-ignore
   protected maxHP: number;
   // @ts-ignore
   protected attackPower: number;
   // @ts-ignore
   protected class: string;
   // @ts-ignore
   protected attackName: string;
   // @ts-ignore
   protected abilityName: string;

   get characterHP(): number {
      return this.healthPoint;
   }

   get characterAP(): number {
      return this.attackPower;
   }

   attack(enemy: any): void {
      enemy.healthPoint -= this.attackPower;
   }

   finishTheEnemy(enemy: any): void {
      enemy.healthPoint = 0;
   }

   abstract ability(): void;

   relive(): void {
      this.healthPoint = this.maxHP;
   }
}

export { Character };
