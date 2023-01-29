import db from '../db';

export async function getClassesPg() {
   const classes = await db.query('SELECT * FROM classes');
   return classes.rows;
}