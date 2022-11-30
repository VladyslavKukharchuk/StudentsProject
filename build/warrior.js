"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warrior = void 0;
const character_1 = require("./character");
class Warrior extends character_1.Сharacter {
    constructor() {
        super();
        this.HP = 200;
        this.maxHP = 200;
        this.class = "Warrior";
    }
    swordStrike(enemy) {
        if (this.HP === 0) {
            console.log('You are dead, if you want to continue the fight, first relive!');
        }
        else {
            if (enemy.HP === 0) {
                console.log('Your opponent is already dead, you can attack another!');
            }
            else {
                if (((enemy.HP - 50) < 0)) {
                    enemy.HP = 0;
                }
                else {
                    enemy.HP -= 50;
                }
            }
        }
    }
    defense() {
        if (this.HP === 0) {
            console.log('You are dead, if you want to continue the fight, first relive!');
        }
        else {
        }
    }
}
exports.Warrior = Warrior;
