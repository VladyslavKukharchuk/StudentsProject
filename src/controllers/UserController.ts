import UserService from '../services/UserService';
import { Request, Response, NextFunction } from 'express';

class UserController {
   // логин
   // получаем email и пароль
   // возвращаем jwt токен
   static async login(req: Request, res: Response, next: NextFunction) {
      await UserService.login(req.body.email, req.body.password)
         .then((userData) => {
            res.status(200).json(userData);
         })
         .catch((err) => next(err));
   }

   // регистрация
   // передаем ник, email, пароль, дубль пароля, id выбранного класса
   // проверяем наличие и корректность всех полей
   // возвращаем созданного юзера
   static async registration(req: Request, res: Response, next: NextFunction) {
      await UserService.registration(req.body.username, req.body.email, req.body.password, req.body.characterClass)
         .then((userData) => {
            res.status(200).json(userData);
         })
         .catch((err) => next(err));
   }

   // обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
   // проверяем токен
   // валидируем переданные данные
   // возвращаем обновленного юзера
   static async update(req: Request, res: Response, next: NextFunction) {
      await UserService.update(Number(req.params.id), req.body.username, req.body.currentPassword, req.body.newPassword, req.body.characterClass)
         .then((updatedUser) => res.status(200).json(updatedUser))
         .catch((err) => next(err));
   }
}

export default UserController;
