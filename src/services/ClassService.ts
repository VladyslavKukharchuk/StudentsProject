import IClassesRepository from '../interfaces/IClassesRepository';

// // возвращаем список доступных классов
export default class ClassService {
   constructor(private repository: IClassesRepository) {}

   async getClasses() {
      const classes = await this.repository.getClasses();
      return classes;
   }
}