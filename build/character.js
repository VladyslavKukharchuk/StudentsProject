"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Сharacter = void 0;
class Сharacter {
    // abstract attack(enemy: any): number;
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
    finishTheEnemy(enemy) {
        enemy.healthPoint = 0;
    }
    attack(enemy) {
        enemy.healthPoint -= this.attackPower;
    }
    get characterHP() {
        return this.healthPoint;
    }
    get characterAP() {
        return this.attackPower;
    }
    // relive() {
    //     if (this.HP !== 0) {
    //         throw new Error('Your character is still alive, you can continue the battle!!!');
    //     }
    //     this.HP = this.maxHP;
    // }
    relive() {
        this.healthPoint = this.maxHP;
    }
}
exports.Сharacter = Сharacter;
