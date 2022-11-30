import { Сharacter } from './character';

class Mage extends Сharacter {

    constructor() {
        super();
        this.HP = 80;
        this.maxHP = 80;
        this.damage = 100;
        this.class = "Mage";
        this.attackName = "Fireball";
        this.abilityName = "Bewitch";
    }

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

    ability(): void {

        if (this.HP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        }

    }
}

export { Mage };