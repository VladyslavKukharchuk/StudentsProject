import { Сharacter } from './character';

class Mage extends Сharacter {

    constructor() {
        super();
        this.HP = 80;
        this.maxHP = 80;
        this.class = "Mage";
    }

    fireball(enemy : any): void {
        if (this.HP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        } else {
            if (enemy.HP === 0) {
                throw new Error('Your opponent is already dead, you can attack another!');
            } else {
                if(((enemy.HP - 100) < 0)){
                    enemy.HP = 0;
                }else{
                    enemy.HP -= 100;
                }
            }
        }
    }

    bewitch(): void {
        if (this.HP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        } else {

        }
    }
} 

export {Mage};