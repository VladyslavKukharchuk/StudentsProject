class UserDto {
   username;
   email;
   id;

   constructor(model: any) {
      this.username = model.username;
      this.email = model.email;
      this.id = model._id;
   }
}

export default UserDto;