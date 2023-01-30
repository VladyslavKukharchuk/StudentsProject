import User from '../models/User';
import { WithId } from 'mongodb';

export default interface IMongoRepository {
   createUser(userData: User): void;
   getAllUsers(): Promise<WithId<User>[] | undefined>;
   getUserById(id: number): Promise<WithId<User> | null | undefined>;
   updateUserHp(id: number, hp: number | undefined): Promise<WithId<User> | null>;
   updateUserStatuses(id: number, statuses: number[]): Promise<WithId<User> | null>;
   deletedUserById(id: number): void;
   deleteAllUsers(): void;
}