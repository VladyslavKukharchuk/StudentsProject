import { Сharacter } from './character';

class Warrior extends Сharacter {

    constructor() {
        super();
        this.healthPoint = 200;
        this.maxHP = 200;
        this.attackPower = 50;
        this.class = "Warrior";
        this.attackName = "Sword Strike";
        this.abilityName = "Defense";
    }

    ability(): void {

    }
}

export { Warrior };