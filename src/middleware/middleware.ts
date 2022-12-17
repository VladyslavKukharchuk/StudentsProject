import {validationEmail} from "./validators/validationEmail";
import {validationPassword} from "./validators/validationPassword";
import {validationNickname} from "./validators/validationNickname";
import {validationDuplicatePassword} from "./validators/validationDuplicatePassword";
import {validationClassId} from "./validators/validationClassId";

class Middleware {
    // логин(получаем email и пароль)
    login

    validationLogin(req, res, next) {
        validationEmail
        validationPassword
        next()
    }

    // передаем ник, email, пароль, дубль пароля, id выбранного класса
    // проверяем наличие и корректность всех полей
    registration

    validationRegistration(req, res, next) {
        validationNickname
        validationEmail
        validationPassword
        validationDuplicatePassword
        validationClassId
        next()
    }

    // обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
    // проверяем токен
    update

    validationUpdate(req, res, next) {
        next()
    }
}

export {Middleware};