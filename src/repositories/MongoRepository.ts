import User from '../models/User';
import { collections } from '../mongo';

//створити користувача
export async function insertUser(userData: User) {
   await collections.users?.insertOne(userData);
}


//знай ти всіх користувачів
export async function findOllUsers()
{
   return await collections.users?.find({}).toArray();
}


//знайти по id
export async function findUserById(id: number) {
   return await collections.users?.findOne({ _id: id });
}


//обновити значення hp
export async function updateUserHp(id: number, hp: number) {
   const updatedUser = await collections.users?.findOneAndUpdate({ _id: id }, { $set: { hp: hp } }, { returnDocument: 'after' });
   // @ts-ignore
   return updatedUser.value;
}


//обновлення знавчення statuses
export async function updateUserStatuses(id: number, statuses: number[]) {
   const updatedUser = await collections.users?.findOneAndUpdate({ _id: id }, { $set: { statuses: statuses } }, { returnDocument: 'after' });
   // @ts-ignore
   return updatedUser.value;
}


//видалити користувача
export async function deletedUserById(id: number) {
   await collections.users?.deleteOne({ _id: id });
}


//видалити всіх користувачів
export async function deleteOllUsers() {
   await collections.users?.deleteMany({});
}


