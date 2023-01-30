import db from '../db';
import IClassesRepository from '../interfaces/IClassesRepository';

export default class ClassesRepository implements IClassesRepository{
   async getClasses() {
      const classes = await db.query('SELECT * FROM classes');
      return classes.rows;
   }
}