import { UserStatusesEnum } from '../config/enums';
import Character from './character';

class Thief extends Character{
   ability(): number {
      return UserStatusesEnum.Escape;
   }
}

export default Thief;
