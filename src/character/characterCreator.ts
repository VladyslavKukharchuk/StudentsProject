import Thief from "../characterClasses/thief";
import Warrior from "../characterClasses/warrior";
import Mage from "../characterClasses/mage";
import { CharacterClassesEnum } from "../config/enums";

class CharacterCreator {
    static createCharacter(className: CharacterClassesEnum, classData: any) {
        switch (className) {
            case CharacterClassesEnum.Thief:
                return new Thief(classData.health, classData.damage, classData.attack_type, classData.ability);
            case CharacterClassesEnum.Mage:
                return new Mage(classData.health, classData.damage, classData.attack_type, classData.ability);
            case CharacterClassesEnum.Warrior:
                return new Warrior(classData.health, classData.damage, classData.attack_type, classData.ability);
            default:
                throw new Error("An invalid character class name.");
        }
    }
}

export default CharacterCreator;