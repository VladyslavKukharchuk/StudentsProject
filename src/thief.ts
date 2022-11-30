import { Сharacter } from './character'

class Thief extends Сharacter {

    constructor() {
        super()
        this.HP = 100;
        this.maxHP = 100;
        this.class = "Thief";
    }

    archeryShot(enemy: any): void {
        if (this.HP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        } else {
            if (this.HP <= 0) {
                throw new Error('Your opponent is already dead, you can attack another!');
            } else {
                if(((enemy.HP - 25) < 0)){
                    enemy.HP = 0;
                }else{
                    enemy.HP -= 25;
                }
            }
        }
    }

    runAway(): void {
        if (this.HP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        } else {

        }
    }
}

export { Thief };