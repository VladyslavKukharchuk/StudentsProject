import {ClassService} from "../services/ClassService";

class ClassController {
    // возвращаем список доступных классов
    static async getAll(req, res, next) {
        await ClassService.getAll()
            .then(classes => res.status(200).json(classes))
            .catch(err => next(err));
    }
}

export {ClassController};