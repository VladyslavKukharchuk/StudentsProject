import { UserStatusesEnum } from '../config/enums';
import Character from './character';

class Warrior extends Character{
   ability(): number {
      return UserStatusesEnum.Defense;
   }
}

export default Warrior;
