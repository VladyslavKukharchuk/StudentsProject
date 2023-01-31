import IUser from './IUser';
import { WithId } from 'mongodb';

export default interface IMongoRepository {
   createUser(userData: IUser): void;
   getAllUsers(): Promise<IUser[]>;
   getUserById(id: number): Promise<IUser>;
   updateUserHp(id: number, hp: number | undefined): Promise<WithId<IUser> | null>;
   updateUserStatuses(id: number, statuses: number[]): Promise<WithId<IUser> | null>;
   deletedUserById(id: number): void;
   deleteAllUsers(): void;
}