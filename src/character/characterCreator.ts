import { Thief } from '../characterClasses/thief';
import { Warrior } from '../characterClasses/warrior';
import { Mage } from '../characterClasses/mage';
import { CharacterClasses } from '../config/enums';

/**
 * The CharacterActions class is our Factory
 */

class CharacterCreator {
    static createCharacter(className: CharacterClasses) {
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

export { CharacterCreator };