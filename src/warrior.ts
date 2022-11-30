import { Сharacter} from './character';

class Warrior extends Сharacter {

    constructor() {
        super();
        this.HP = 200;
        this.maxHP = 200;
        this.class = "Warrior";
    }

    swordStrike(enemy: any): void {
        if (this.HP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        } else {
            if (enemy.HP === 0) {
                throw new Error('Your opponent is already dead, you can attack another!');
            } else {
                if(((enemy.HP - 50) < 0)){
                    enemy.HP = 0;
                }else{
                    enemy.HP -= 50;
                }
            }
        }
    }

    defense(): void {
        if (this.HP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        } else {

        }
    }
} 

export {Warrior};