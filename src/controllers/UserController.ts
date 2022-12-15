import { UserService } from "../services/UserService";

class UserController {

    // логин(получаем email и пароль, находим юзера, проверяем, создаем сессию в mongodb, возвращаем jwt токен)
    // получаем email и пароль
    // создаем сессию в mongodb
    // возвращаем jwt токен
    async login(req, res) {
        // try {
        //     const { username, password } = req.body;
        //     const accessToken = await UserService.login(username, password);
        //     req.status(200).json({ accessToken });
        // } catch (e) {
        //     res.status(500).json(e)
        // }
    }


    // регистрация
    // передаем ник, email, пароль, дубль пароля, id выбранного класса
    // проверяем наличие и корректность всех полей
    // возвращаем созданного юзера
    async registration(req, res) {
        // try {
        //     const { nickname, email, password, duplicatePassword, id } = req.body;
        //     const newUser = await UserService.registration(nickname, email, password, duplicatePassword, id);
        //     res.status(200).json(newUser);
        // } catch (e) {
        //     res.status(500).json(e)
        // }
    }


    // обновление личных данных(ник, старый пароль, пароль, дубль пароля, id нового класса)
    // проверяем токен
    // валидируем переданные данные
    // возвращаем обновленного юзера
    async update(req, res) {
        // try {
        //     const { id } = req.params;
        //     const { changes } = req.body;
        //     const updatedUser = await  UserService.update(id, changes);
        //     res.json(updatedUser);
        // } catch (e) {
        //     res.status(500).json(e)
        // }
    }
}


export { UserController };