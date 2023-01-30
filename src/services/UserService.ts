import bcrypt from 'bcrypt';
import UserDto from '../dtos/UserDto';
import { generateTokens } from './TokenServiсe';
import { BadRequest } from '../exceptions/ApiError';
import IUsersRepository from '../interfaces/IUsersRepository';

export default class UserService {
   constructor(private repository: IUsersRepository) {
   }

   // логин
   // находим юзера, проверяем
   // возвращаем jwt токен
   async login(email: string, password: string) {
      const user = await this.repository.getUserByEmail(email);
      if (!user) {
         throw new BadRequest('No user with this email address was found');
      }

      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
         throw new BadRequest('Incorrect password');
      }

      const userDto = new UserDto(user);

      const token = generateTokens({ ...userDto });

      return { ...token, user: userDto };
   }

   // регистрация
   // создаем запись юзера в postgresSQL
   // возвращаем созданного юзера
   async registration(username: string, email: string, password: string, characterClass: number) {
      const candidate = await this.repository.getUserByEmail(email);

      if (candidate) {
         throw new BadRequest('User with this email already exists');
      }
      const hashPassword = await bcrypt.hash(password, 3);

      const user = await this.repository.createUser(username, email, hashPassword, characterClass);

      const userDto = new UserDto(user);

      const token = generateTokens({ ...userDto });

      return { ...token, user: userDto };
   }

   // обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
   // обновляем запись в базе данных
   // возвращаем обновленного юзера
   async update(id: number, username: string, currentPassword: string, newPassword: string, characterClass: number) {
      if (!id) {
         throw new Error('ID is not specified');
      }

      const { password } = await this.repository.getUserPasswordById(id);

      const isPassEquals = await bcrypt.compare(currentPassword, password);
      if (!isPassEquals) {
         throw new BadRequest('Incorrect password');
      }

      const hashPassword = await bcrypt.hash(newPassword, 3);

      const updatedUser = await this.repository.updateUser(id, username, hashPassword, characterClass);

      const userDto = new UserDto(updatedUser);

      return { user: userDto };
   }
}