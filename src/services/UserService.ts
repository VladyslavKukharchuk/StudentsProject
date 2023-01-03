import User from "../models/User";
import bcrypt from "bcrypt";
import { UserDto } from '../dtos/UserDto';
import { TokenServise } from './TokenServise';
import { ValidationError } from "../middleware/errorHandler";


class UserService {
   // логин
   // находим юзера, проверяем
   // возвращаем jwt токен
   static async login(email: any, password: any) {
      const user = await User.findOne({ email });
      if (!user) {
         throw new ValidationError("No user with this email address was found");
      }

      const isPassEquals = await bcrypt.compare(password, user.password);
      if(!isPassEquals){
         throw new ValidationError("Incorrect password");
      }

      const userDto = new UserDto(user);
      const token = TokenServise.generateTokens({...userDto});

      await TokenServise.saveToken(userDto.id, token.refreshToken);
      return {...token, user: userDto};
   }

   // регистрация
   // создаем запись юзера в postgresSQL
   // возвращаем созданного юзера
   static async registration(username: any, email: any, password: any, duplicatePassword: any) {
      const candidate = await User.findOne({ email });
      if (candidate) {
         throw new ValidationError("User with this email already exists", email);
      }
      const hashPassword = await bcrypt.hash(password, 3);

      const user = await User.create({ username, email, password: hashPassword});
      const userDto = new UserDto(user);

      const token = TokenServise.generateTokens({...userDto});
      await TokenServise.saveToken(userDto.id, token.refreshToken);

      return {...token, user: userDto};
   }

   // обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
   // обновляем запись в базе данных
   // возвращаем обновленного юзера
   static async update(id: any, user: any) {
      if (!id) {
         throw new Error("ID is not specified");
      }
      const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
      return updatedUser;
   }

   static async refresh(refreshToken: any) {
      if (!refreshToken) {
         throw new Error("The user is not authorized");
      }

      const userData = TokenServise.validateRefreshToken(refreshToken.refreshToken);
      const tokenFromDb = await TokenServise.findToken(refreshToken);
      if(!userData || !tokenFromDb){
         throw new Error("The user is not authorized");
      }

      // @ts-ignore
      const user = await User.findById(userData.id);
      const userDto = new UserDto(user);
      const token = TokenServise.generateTokens({...userDto});

      await TokenServise.saveToken(userDto.id, token.refreshToken);
      return {...token, user: userDto};
   }

   static async logout(refreshToken: any) {
      const token = await TokenServise.removeToken(refreshToken);
      return token;
   }
}

export { UserService };
