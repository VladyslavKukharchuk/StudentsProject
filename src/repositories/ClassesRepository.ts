import db from '../databases/db';
import IClassesRepository from '../interfaces/IClassesRepository';
import IClass from '../interfaces/IClass';

export default class ClassesRepository implements IClassesRepository {
   async getClasses() {
      const classes = await db.query('SELECT * FROM classes');
      return classes.rows as IClass[];
   }
}