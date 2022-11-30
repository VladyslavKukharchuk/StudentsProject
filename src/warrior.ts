import { Сharacter } from './character';

class Warrior extends Сharacter {

    constructor() {
        super();
        this.HP = 200;
        this.maxHP = 200;
        this.damage = 50;
        this.class = "Warrior";
        this.attackName = "Sword Strike";
        this.abilityName = "Defense";
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

export { Warrior };