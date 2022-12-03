import { Thief } from './thief';
import { Warrior } from './warrior';
import { Mage } from './mage';
import { CharacterClasses } from './enums';
import { CharacterActions } from './characterActions';

/**
 * The CharacterActions class is our Factory
 */

class Provider {
    static createCharacter(className: string) {
        switch (className) {
            case CharacterClasses.Thief:
                return new CharacterActions(Thief);
            case CharacterClasses.Mage:
                return new CharacterActions(Mage);
            case CharacterClasses.Warrior:
                return new CharacterActions(Warrior);
            default:
                throw new Error('An invalid character class name.');
        }
    }
}

export { Provider };