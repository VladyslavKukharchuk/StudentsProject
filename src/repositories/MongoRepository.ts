import User from '../models/User';
import { collections } from '../mongo';
import IMongoRepository from '../interfaces/IMongoRepository';

export default class MongoRepository implements IMongoRepository{
   //створити користувача
   async createUser(userData: User) {
      await collections.users?.insertOne(userData);
   }


   //знай ти всіх користувачів
   async getAllUsers() {
      return await collections.users?.find({}).toArray();
   }


   //знайти по id
   async getUserById(id: number) {
         const user = await collections.users?.findOne({ _id: id });
         if (user){
            return user;
         }
   }


   //обновити значення hp
   async updateUserHp(id: number, hp: number) {
      const updatedUser = await collections.users?.findOneAndUpdate({ _id: id }, { $set: { hp: hp } }, { returnDocument: 'after' });
      // @ts-ignore
      return updatedUser.value;
   }


   //обновлення знавчення statuses
   async updateUserStatuses(id: number, statuses: number[]) {
      const updatedUser = await collections.users?.findOneAndUpdate({ _id: id }, { $set: { statuses: statuses } }, { returnDocument: 'after' });
      // @ts-ignore
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

