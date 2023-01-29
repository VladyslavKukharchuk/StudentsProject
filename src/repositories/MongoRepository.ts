import User from '../models/User';
import { collections } from '../mongo';

//створити користувача
export async function createUserMg(userData: User) {
   await collections.users?.insertOne(userData);
}


//знай ти всіх користувачів
export async function getAllUsersMg() {
   return await collections.users?.find({}).toArray();
}


//знайти по id
export async function getUserByIdMg(id: number) {
   return await collections.users?.findOne({ _id: id });
}


//обновити значення hp
export async function updateUserHpMg(id: number, hp: number) {
   const updatedUser = await collections.users?.findOneAndUpdate({ _id: id }, { $set: { hp: hp } }, { returnDocument: 'after' });
   // @ts-ignore
   return updatedUser.value;
}


//обновлення знавчення statuses
export async function updateUserStatusesMg(id: number, statuses: number[]) {
   const updatedUser = await collections.users?.findOneAndUpdate({ _id: id }, { $set: { statuses: statuses } }, { returnDocument: 'after' });
   // @ts-ignore
   return updatedUser.value;
}


//видалити користувача
export async function deletedUserByIdMg(id: number) {
   await collections.users?.deleteOne({ _id: id });
}


//видалити всіх користувачів
export async function deleteAllUsersMg() {
   await collections.users?.deleteMany({});
}


