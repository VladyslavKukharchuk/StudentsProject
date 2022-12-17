import {ClassService} from "../services/ClassService";


class ClassController {
    // возвращаем список доступных классов
    static async getAll(req, res) {
        try {
            const classes = await ClassService.getAll();
            res.status(200).json(classes);
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export {ClassController};