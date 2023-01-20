import { UserStatusesEnum } from '../config/enums';
import Character from './character';

class Mage extends Character{
   ability(): number {
      return UserStatusesEnum.Enchant;
   }
}

export default Mage;
