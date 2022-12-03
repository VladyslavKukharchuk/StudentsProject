"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const thief_1 = require("./thief");
const warrior_1 = require("./warrior");
const mage_1 = require("./mage");
const enums_1 = require("./enums");
// class Provider {
//     // static createCharacter(className: string) {
//     //     if (className === 'Thief') {
//     //         return new Thief();
//     //     } else if (className === 'Mage') {
//     //         return new Mage();
//     //     } else if (className === 'Warrior') {
//     //         return new Warrior();
//     //     }
//     // }
//     static createCharacter(classes: CharacterClasses) {
//         switch (classes) {
//             case CharacterClasses.Thief:
//                 return new Thief();
//             case CharacterClasses.Mage:
//                 return new Mage();
//             case CharacterClasses.Warrior:
//                 return new Warrior();
//             default:
//                 throw new Error('An invalid character class name.');
//         }
//     }
// }
class Provider {
    static createCharacter(className) {
        switch (className) {
            case enums_1.CharacterClasses.Thief:
                return new thief_1.Thief();
            case enums_1.CharacterClasses.Mage:
                return new mage_1.Mage();
            case enums_1.CharacterClasses.Warrior:
                return new warrior_1.Warrior();
            default:
                throw new Error('An invalid character class name.');
        }
    }
}
exports.Provider = Provider;
