import { UserService } from '../services/UserService';
import { Request, Response, NextFunction } from 'express';

class UserController {
   // логин
   // получаем email и пароль
   // возвращаем jwt токен
   static async login(req: Request, res: Response, next: NextFunction) {
      await UserService.login(req.body)
         .then((accessToken) => res.status(200).json(accessToken))
         .catch((err) => next(err));
   }

   // регистрация
   // передаем ник, email, пароль, дубль пароля, id выбранного класса
   // проверяем наличие и корректность всех полей
   // возвращаем созданного юзера
   static async registration(req: Request, res: Response, next: NextFunction) {
      await UserService.registration(req.body)
         .then((newUser) => res.status(200).json(newUser))
         .catch((err) => next(err));
   }

   // обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
   // проверяем токен
   // валидируем переданные данные
   // возвращаем обновленного юзера
   static async update(req: Request, res: Response, next: NextFunction) {
      await UserService.update(req.params.id, req.body)
         .then((updatedUser) => res.status(200).json(updatedUser))
         .catch((err) => next(err));
   }
}

export { UserController };
