"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mage = void 0;
const character_1 = require("./character");
class Mage extends character_1.Сharacter {
    constructor() {
        super();
        this.HP = 80;
        this.maxHP = 80;
        this.class = "Mage";
    }
    fireball(enemy) {
        if (this.HP === 0) {
            console.log('You are dead, if you want to continue the fight, first relive!');
        }
        else {
            if (enemy.HP === 0) {
                console.log('Your opponent is already dead, you can attack another!');
            }
            else {
                if (((enemy.HP - 100) < 0)) {
                    enemy.HP = 0;
                }
                else {
                    enemy.HP -= 100;
                }
            }
        }
    }
    bewitch() {
        if (this.HP === 0) {
            console.log('You are dead, if you want to continue the fight, first relive!');
        }
        else {
        }
    }
}
exports.Mage = Mage;
