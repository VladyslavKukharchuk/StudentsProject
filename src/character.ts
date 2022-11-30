abstract class Сharacter {

    protected HP: number;
    protected maxHP: number;
    protected damage: number;
    protected class: string;
    protected attackName: string;
    protected abilityName: string;

    // abstract attack(enemy: any): number;

    attack(enemy: any): number {

        if (this.HP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        }

        if (enemy.HP <= 0) {
            throw new Error('Your opponent is already dead, you can attack another!');
        }

        if (((enemy.HP - this.damage) < 0)) {
            return enemy.HP = 0;
        }

        return enemy.HP -= this.damage;

    }

    abstract ability(): void;

    get currentHP(): number {
        return this.HP
    }

    relive() {
        if (this.HP !== 0) {
            throw new Error('Your character is still alive, you can continue the battle!!!');
        }
        this.HP = this.maxHP;
    }
}

export { Сharacter };