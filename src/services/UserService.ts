import User from "../models/User";
import bcrypt from "bcrypt";
import UserDto from '../dtos/UserDto';
import TokenService from './TokenServiсe';
import ApiError from '../exceptions/ApiError';


class UserService {
   // логин
   // находим юзера, проверяем
   // возвращаем jwt токен
   static async login(email: any, password: any) {
      const user = await User.findOne({ email });
      if (!user) {
         throw ApiError.BadRequest("No user with this email address was found");
      }

      const isPassEquals = await bcrypt.compare(password, user.password);
      if(!isPassEquals){
         throw ApiError.BadRequest("Incorrect password");
      }

      const userDto = new UserDto(user);
      const token = TokenService.generateTokens({...userDto});

      await TokenService.saveToken(userDto.id, token.refreshToken);
      return {...token, user: userDto};
   }

   // регистрация
   // создаем запись юзера в postgresSQL
   // возвращаем созданного юзера
   static async registration(username: any, email: any, password: any) {
      const candidate = await User.findOne({ email });
      if (candidate) {
         throw ApiError.BadRequest("User with this email already exists");
      }
      const hashPassword = await bcrypt.hash(password, 3);

      const user = await User.create({ username, email, password: hashPassword});
      const userDto = new UserDto(user);

      const token = TokenService.generateTokens({...userDto});
      await TokenService.saveToken(userDto.id, token.refreshToken);

      return {...token, user: userDto};
   }

   // обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
   // обновляем запись в базе данных
   // возвращаем обновленного юзера
   static async update(id: any, username: string, email: string, password: string) {
      if (!id) {
         throw new Error("ID is not specified");
      }
      const hashPassword = await bcrypt.hash(password, 3);

      const updatedUser = await User.findByIdAndUpdate(id, { username, email, password: hashPassword}, { new: true });

      const userDto = new UserDto(updatedUser);

      return {user: userDto};
   }

   static async refresh(refreshToken: any) {
      if (!refreshToken) {
         throw ApiError.UnauthorizedError();
      }

      const userData = TokenService.validateRefreshToken(refreshToken.refreshToken);

      const tokenFromDb = await TokenService.findToken(refreshToken);
      if(!userData || !tokenFromDb){
         throw ApiError.UnauthorizedError();
      }

      // @ts-ignore
      const user = await User.findById(userData.id);
      const userDto = new UserDto(user);
      const token = TokenService.generateTokens({...userDto});

      await TokenService.saveToken(userDto.id, token.refreshToken);
      return {...token, user: userDto};
   }

   static async logout(refreshToken: any) {
      const token = await TokenService.removeToken(refreshToken);
      return token;
   }
}

export default UserService;
