"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterActions = void 0;
class CharacterActions {
    constructor(CharacterClass) {
        this.character = new CharacterClass;
    }
    useAttack(enemy) {
        if (this.character.characterHP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        }
        if (enemy.character.characterHP === 0) {
            throw new Error('Your opponent is already dead, you can attack another!');
        }
        if (((enemy.character.characterHP - this.character.characterAP) < 0)) {
            return this.character.finishTheEnemy(enemy.character);
        }
        this.character.attack(enemy.character);
    }
    useAbility() {
        if (this.character.characterHP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        }
        this.character.ability();
    }
    useRelive() {
        if (this.character.characterHP !== 0) {
            throw new Error('Your character is still alive, you can continue the battle!!!');
        }
        this.character.relive();
    }
}
exports.CharacterActions = CharacterActions;
