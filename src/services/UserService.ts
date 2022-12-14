import User from "../models/User";

import jwt from "jsonwebtoken";
import { secret } from "../config/jwtKey";

import { ValidationError } from "../middleware/errorHandler";

const generateAccessToken = (id: any) => {
   const payload = {
      id,
   };
   return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class UserService {
   // логин
   // находим юзера, проверяем
   // возвращаем jwt токен
   static async login(userData: any) {
      const { email, password } = userData;
      const user = await User.findOne({ email });
      const validPassword = await User.findOne({ password });
      if (!(user && validPassword)) {
         throw new ValidationError("Incorrect email or password");
      }
      const token = generateAccessToken(user._id);
      return { token };
   }

   // регистрация
   // создаем запись юзера в postgresSQL
   // возвращаем созданного юзера
   static async registration(user: any) {
      const { username, email, password, duplicatePassword, id } = user;
      const candidate = await User.findOne({ email });
      if (candidate) {
         throw new ValidationError("User with this email already exists", email);
      }
      const newUser = await User.create({ username, email, password, id });
      return newUser;
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
}

export { UserService };
