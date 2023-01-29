import { getClassesPg }from '../repositories/ClassesRepository';

// // возвращаем список доступных классов
export async function getClasses() {
   const classes = await getClassesPg();
   return classes;
}