import bcrypt from 'bcrypt';
import UserDto from '../dtos/UserDto';
import TokenService from './TokenServiсe';
import { BadRequest} from '../exceptions/ApiError';
import UserRepository from '../repositories/UsersRepository';


class UserService {
   // логин
   // находим юзера, проверяем
   // возвращаем jwt токен
   static async login(email: string, password: string) {
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
         throw new BadRequest('No user with this email address was found');
      }

      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
         throw new BadRequest('Incorrect password');
      }

      const userDto = new UserDto(user);

      const token = TokenService.generateTokens({ ...userDto });

      return { ...token, user: userDto };
   }

   // регистрация
   // создаем запись юзера в postgresSQL
   // возвращаем созданного юзера
   static async registration(username: string, email: string, password: string, characterClass: number) {
      const candidate = await UserRepository.getUserByEmail(email);

      if (candidate) {
         throw new BadRequest('User with this email already exists');
      }
      const hashPassword = await bcrypt.hash(password, 3);

      const user = await UserRepository.createUser(username, email, hashPassword, characterClass);

      const userDto = new UserDto(user);

      const token = TokenService.generateTokens({ ...userDto });

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
         throw new BadRequest('Incorrect password');
      }

      const hashPassword = await bcrypt.hash(newPassword, 3);

      const updatedUser = await UserRepository.updateUser(id, username, hashPassword, characterClass);

      const userDto = new UserDto(updatedUser);

      return { user: userDto };
   }
}

export default UserService;
