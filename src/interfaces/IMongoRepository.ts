import User from './User';
import { WithId } from 'mongodb';

export default interface IMongoRepository {
   createUser(userData: User): void;
   getAllUsers(): Promise<User[]>;
   getUserById(id: number): Promise<User>;
   updateUserHp(id: number, hp: number | undefined): Promise<WithId<User> | null>;
   updateUserStatuses(id: number, statuses: number[]): Promise<WithId<User> | null>;
   deletedUserById(id: number): void;
   deleteAllUsers(): void;
}