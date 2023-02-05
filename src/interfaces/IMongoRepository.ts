import IUser from './IUser';

export default interface IMongoRepository {
   createUser(userData: IUser): void;
   getAllUsers(): Promise<IUser[]>;
   getUserById(id: number): Promise<IUser>;
   updateUserHp(id: number, hp: number): Promise<IUser>;
   updateUserStatuses(id: number, statuses: number[]): Promise<IUser>;
   deletedUserById(id: number): void;
   deleteAllUsers(): void;
}