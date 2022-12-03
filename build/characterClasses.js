"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const thief_1 = require("./thief");
const warrior_1 = require("./warrior");
const mage_1 = require("./mage");
const enums_1 = require("./enums");
const characterActions_1 = require("./characterActions");
class Provider {
    static createCharacter(className) {
        switch (className) {
            case enums_1.CharacterClasses.Thief:
                return new characterActions_1.CharacterActions(thief_1.Thief);
            case enums_1.CharacterClasses.Mage:
                return new characterActions_1.CharacterActions(mage_1.Mage);
            case enums_1.CharacterClasses.Warrior:
                return new characterActions_1.CharacterActions(warrior_1.Warrior);
            default:
                throw new Error('An invalid character class name.');
        }
    }
}
exports.Provider = Provider;
