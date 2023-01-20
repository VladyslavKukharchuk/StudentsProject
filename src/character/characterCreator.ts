import Thief from "../characterClasses/thief";
import Warrior from "../characterClasses/warrior";
import Mage from "../characterClasses/mage";
import { CharacterClassesEnum } from "../config/enums";
import { IClassData } from '../services/EventService';

class CharacterCreator {
    static createCharacter(className: CharacterClassesEnum, {name, health, damage, attack_type, ability}: IClassData) {
        switch (className) {
            case CharacterClassesEnum.Thief:
                return new Thief(name, health, damage, attack_type, ability);
            case CharacterClassesEnum.Mage:
                return new Mage(name, health, damage, attack_type, ability);
            case CharacterClassesEnum.Warrior:
                return new Warrior(name, health, damage, attack_type, ability);
            default:
                throw new Error("An invalid character class name.");
        }
    }
}

export default CharacterCreator;