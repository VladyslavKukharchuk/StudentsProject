import ClassesRepository from '../repositories/ClassesRepository';

class ClassService {
   // // возвращаем список доступных классов
   static async getAll() {
      const classes = await ClassesRepository.getClasses();
      return classes;
   }
}

export default ClassService;