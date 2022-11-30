"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thief = void 0;
const character_1 = require("./character");
class Thief extends character_1.Сharacter {
    constructor() {
        super();
        this.HP = 100;
        this.maxHP = 100;
        this.damage = 25;
        this.class = "Thief";
        this.attackName = "Archery Shot";
        this.abilityName = "Run Away";
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
    ability() {
        if (this.HP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        }
    }
}
exports.Thief = Thief;
