import { Thief } from './thief';
import { Warrior } from './warrior';
import { Mage } from './mage';
import { CharacterClasses } from './enums';

/**
 * The CharacterActions class is our Factory
 */

class Creator {
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

export { Creator };