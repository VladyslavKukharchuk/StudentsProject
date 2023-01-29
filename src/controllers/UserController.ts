import { login, registration, update } from '../services/UserService';
import { Request, Response, NextFunction } from 'express';

// логин
// получаем email и пароль
// возвращаем jwt токен
export async function loginUser(req: Request, res: Response, next: NextFunction) {
   await login(req.body.email, req.body.password)
      .then((userData) => {
         res.status(200).json(userData);
      })
      .catch((err) => next(err));
}

// регистрация
// передаем ник, email, пароль, дубль пароля, id выбранного класса
// проверяем наличие и корректность всех полей
// возвращаем созданного юзера
export async function registrationUser(req: Request, res: Response, next: NextFunction) {
   await registration(req.body.username, req.body.email, req.body.password, req.body.characterClass)
      .then((userData) => {
         res.status(200).json(userData);
      })
      .catch((err) => next(err));
}

// обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
// проверяем токен
// валидируем переданные данные
// возвращаем обновленного юзера
export async function updateUser(req: Request, res: Response, next: NextFunction) {
   await update(Number(req.params.id), req.body.username, req.body.currentPassword, req.body.newPassword, req.body.characterClass)
      .then((updatedUser) => res.status(200).json(updatedUser))
      .catch((err) => next(err));
}


