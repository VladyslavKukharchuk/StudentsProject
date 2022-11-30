"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Сharacter = void 0;
class Сharacter {
    relive() {
        if (this.HP === 0) {
            this.HP = this.maxHP;
        }
        else {
            console.log('Your character is still alive, you can continue the battle!!!');
        }
    }
}
exports.Сharacter = Сharacter;
