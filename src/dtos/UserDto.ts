class UserDto {
   id;
   username;
   email;
   class;

   constructor(model: any) {
      this.id = model.id;
      this.username = model.username;
      this.email = model.email;
      this.class = model.class_id
   }
}

export default UserDto;