abstract class Сharacter {

    protected healthPoint: number;
    protected maxHP: number;
    protected attackPower: number;
    protected class: string;
    protected attackName: string;
    protected abilityName: string;

    // abstract attack(enemy: any): number;

    // attack(enemy: any): number {

    //     if (this.HP === 0) {
    //         throw new Error('You are dead, if you want to continue the fight, first relive!');
    //     }

    //     if (enemy.HP <= 0) {
    //         throw new Error('Your opponent is already dead, you can attack another!');
    //     }

    //     if (((enemy.HP - this.damage) < 0)) {
    //         return enemy.HP = 0;
    //     }

    //     return enemy.HP -= this.damage;

    // }

    finishTheEnemy(enemy: any): void {
        enemy.healthPoint = 0;
    }

    attack(enemy: any): void {
        enemy.healthPoint -= this.attackPower;
    }

    abstract ability(): void;

    get characterHP(): number {
        return this.healthPoint;
    }

    get characterAP(): number {
        return this.attackPower;
    }

    // relive() {
    //     if (this.HP !== 0) {
    //         throw new Error('Your character is still alive, you can continue the battle!!!');
    //     }
    //     this.HP = this.maxHP;
    // }

    relive(): void {
        this.healthPoint = this.maxHP;
    }
}

export { Сharacter };