import IUser from '../interfaces/IUser';
import { collections } from '../mongo';
import IMongoRepository from '../interfaces/IMongoRepository';
import { ModifyResult } from 'mongodb';

export default class MongoRepository implements IMongoRepository{
   //створити користувача
   async createUser(userData: IUser) {
      await collections.users?.insertOne(userData);
   }

   //знайти всіх користувачів
   async getAllUsers() {
      const users = (await collections.users?.find({}).toArray()) as IUser[];
      return users;
   }

   //знайти по id
   async getUserById(id: number) {
         const user = (await collections.users?.findOne({ _id: id })) as IUser;
         return user;
   }

   //обновити значення hp
   async updateUserHp(id: number, hp: number) {
      const updatedUser = await collections.users?.findOneAndUpdate({ _id: id }, { $set: { hp: hp } }, { returnDocument: 'after' }) as  ModifyResult<IUser>;
      return updatedUser.value;
   }

   //обновлення знавчення statuses
   async updateUserStatuses(id: number, statuses: number[]) {
      const updatedUser = await collections.users?.findOneAndUpdate({ _id: id }, { $set: { statuses: statuses } }, { returnDocument: 'after' }) as  ModifyResult<IUser>;
      return updatedUser.value;
   }

   //видалити користувача
   async deletedUserById(id: number) {
      await collections.users?.deleteOne({ _id: id });
   }

   //видалити всіх користувачів
   async deleteAllUsers() {
      await collections.users?.deleteMany({});
   }
}

