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

    attack(enemy: any): number {

        if (this.healthPoint === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        }

        if (enemy.healthPoint <= 0) {
            throw new Error('Your opponent is already dead, you can attack another!');
        }

        if (((enemy.healthPoint - this.attackPower) < 0)) {
            return enemy.healthPoint = 0;
        }

        return enemy.healthPoint -= this.attackPower;

    }

    abstract ability(): void;

    relive() {
        if (this.healthPoint !== 0) {
            throw new Error('Your character is still alive, you can continue the battle!!!');
        }
        this.healthPoint = this.maxHP;
    }
}

export { Сharacter };