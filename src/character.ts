abstract class Сharacter {

    protected healthPoint: number;
    protected maxHP: number;
    protected attackPower: number;
    protected class: string;
    protected attackName: string;
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

export { Сharacter };