import db from "../db";

class ClassesRepository {
   static async getClasses(){
      const classes = await db.query('SELECT * FROM classes');
      return classes.rows;
   }
}

export default ClassesRepository;