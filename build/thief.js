"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thief = void 0;
const character_1 = require("./character");
class Thief extends character_1.Сharacter {
    constructor() {
        super();
        this.HP = 100;
        this.maxHP = 100;
        this.class = "Thief";
    }
    archeryShot(enemy) {
        if (this.HP === 0) {
            console.log('You are dead, if you want to continue the fight, first relive!');
        }
        else {
            if (this.HP <= 0) {
                console.log('Your opponent is already dead, you can attack another!');
            }
            else {
                if (((enemy.HP - 25) < 0)) {
                    enemy.HP = 0;
                }
                else {
                    enemy.HP -= 25;
                }
            }
        }
    }
    runAway() {
        if (this.HP === 0) {
            console.log('You are dead, if you want to continue the fight, first relive!');
        }
        else {
        }
    }
}
exports.Thief = Thief;
