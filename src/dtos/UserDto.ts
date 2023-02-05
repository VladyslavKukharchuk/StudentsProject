import IUserData from '../interfaces/IUserData';

class UserDto {
   id;
   username;
   email;
   class;

   constructor(model: IUserData) {
      this.id = model.id;
      this.username = model.username;
      this.email = model.email;
      this.class = model.class_id
   }
}

export default UserDto;