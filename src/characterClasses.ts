import { Thief } from './thief';
import { Warrior } from './warrior';
import { Mage } from './mage';
import { CharacterClasses } from './enums';

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
    static createCharacter(className: string) {
        switch (className) {
            case CharacterClasses.Thief:
                return new Thief();
            case CharacterClasses.Mage:
                return new Mage();
            case CharacterClasses.Warrior:
                return new Warrior();
            default:
                throw new Error('An invalid character class name.');
        }
    }
}

export { Provider };