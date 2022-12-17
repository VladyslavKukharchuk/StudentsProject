import User from "../models/User";

import jwt from "jsonwebtoken";
import {secret} from "../config/jwtKey";

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}


class UserService {
    // логин
    // находим юзера, проверяем
    // возвращаем jwt токен
    static async login(userData) {
        const {email, password} = userData;
        const user = await User.findOne({email});
        const validPassword = await User.findOne({password});
        if (!(user && validPassword)) {
            throw new Error('Incorrect email or password');
        }
        const token = generateAccessToken(user._id);
        return {token};
    }

    // регистрация
    // создаем запись юзера в postgreSQL
    // возвращаем созданного юзера
    static async registration(user) {
        const {username, email, password, duplicatePassword, id} = user;
        const candidate = await User.findOne({email});
        if (candidate) {
            throw new Error('a user with this email already exists');
        }
        const newUser = await User.create({username, email, password, id});
        return newUser;
    }

    // обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
    // обновляем запись в базе данных
    // возвращаем обновленного юзера
    static async update(id, user) {
        if (!id) {
            throw new Error("ID is not specified")
        }
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
        return updatedUser;
    }
}


export {UserService};

