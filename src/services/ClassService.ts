import Class from "../models/Class";

class ClassService {
    // // возвращаем список доступных классов
    static async getAll() {
        const classes = await Class.find();
        return classes;
    }
}

export {ClassService};