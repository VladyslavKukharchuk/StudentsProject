import User from "../models/User";
import {UserService} from "../services/UserService";

class UserController {
    // логин
    // получаем email и пароль
    // возвращаем jwt токен
    static async login(req, res, next) {
        try {
            const accessToken = await UserService.login(req.body);
            res.status(200).json(accessToken);
        } catch (e) {
            next(e);
        }
    }


    // регистрация
    // передаем ник, email, пароль, дубль пароля, id выбранного класса
    // проверяем наличие и корректность всех полей
    // возвращаем созданного юзера
    static async registration(req, res, next) {
        try {
            const newUser = await UserService.registration(req.body);
            res.status(200).json(newUser);
        } catch (e) {
            next(e);
        }
    }


    // обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
    // проверяем токен
    // валидируем переданные данные
    // возвращаем обновленного юзера
    static async update(req, res, next) {
        try {
            const updatedUser = await UserService.update(req.params.id, req.body);
            res.status(200).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
}


export {UserController};