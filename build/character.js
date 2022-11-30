"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Сharacter = void 0;
class Сharacter {
    // abstract attack(enemy: any): number;
    attack(enemy) {
        if (this.HP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        }
        if (enemy.HP <= 0) {
            throw new Error('Your opponent is already dead, you can attack another!');
        }
        if (((enemy.HP - this.damage) < 0)) {
            return enemy.HP = 0;
        }
        return enemy.HP -= this.damage;
    }
    get currentHP() {
        return this.HP;
    }
    relive() {
        if (this.HP !== 0) {
            throw new Error('Your character is still alive, you can continue the battle!!!');
        }
        this.HP = this.maxHP;
    }
}
exports.Сharacter = Сharacter;
