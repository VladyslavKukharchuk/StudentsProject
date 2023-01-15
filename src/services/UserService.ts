import bcrypt from 'bcrypt';
import UserDto from '../dtos/UserDto';
import TokenService from './TokenServiсe';
import ApiError from '../exceptions/ApiError';
import UserRepository from '../repositories/UsersRepository';

class UserService {
   // логин
   // находим юзера, проверяем
   // возвращаем jwt токен
   static async login(email: string, password: string) {
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
         throw ApiError.BadRequest('No user with this email address was found');
      }

      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
         throw ApiError.BadRequest('Incorrect password');
      }

      const userDto = new UserDto(user);

      const token = TokenService.generateTokens({ ...userDto });
      await TokenService.saveToken(userDto.id, token.refreshToken);

      return { ...token, user: userDto };
   }

   // регистрация
   // создаем запись юзера в postgresSQL
   // возвращаем созданного юзера
   static async registration(username: string, email: string, password: string, characterClass: number) {
      const candidate = await UserRepository.getUserByEmail(email);

      if (candidate) {
         throw ApiError.BadRequest('User with this email already exists');
      }
      const hashPassword = await bcrypt.hash(password, 3);

      const user = await UserRepository.createUser(username, email, hashPassword, characterClass);

      const userDto = new UserDto(user);

      const token = TokenService.generateTokens({ ...userDto });
      await TokenService.saveToken(userDto.id, token.refreshToken);

      return { ...token, user: userDto };
   }

   // обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
   // обновляем запись в базе данных
   // возвращаем обновленного юзера
   static async update(id: number, username: string, currentPassword: string, newPassword: string, characterClass: number) {
      if (!id) {
         throw new Error('ID is not specified');
      }

      const { password } = await UserRepository.getUserPasswordById(id);

      const isPassEquals = await bcrypt.compare(currentPassword, password);
      if (!isPassEquals) {
         throw ApiError.BadRequest('Incorrect password');
      }

      const hashPassword = await bcrypt.hash(newPassword, 3);

      const updatedUser = await UserRepository.updateUser(id, username, hashPassword, characterClass);

      const userDto = new UserDto(updatedUser);

      return { user: userDto };
   }

   static async refresh(refreshToken: string) {
      if (!refreshToken) {
         throw ApiError.UnauthorizedError();
      }

      const userData = TokenService.validateRefreshToken(refreshToken);

      const tokenFromDb = await TokenService.findToken(refreshToken);

      if (!userData || !tokenFromDb) {
         throw ApiError.UnauthorizedError();
      }

      // @ts-ignore
      const user = await UserRepository.getUserById(userData.id);
      const userDto = new UserDto(user);
      const token = TokenService.generateTokens({ ...userDto });

      await TokenService.saveToken(userDto.id, token.refreshToken);
      return { ...token, user: userDto };
   }

   static async logout(refreshToken: string) {
      const token = await TokenService.removeToken(refreshToken);
      return token;
   }
}

export default UserService;
