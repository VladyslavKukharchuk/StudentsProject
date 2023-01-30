import IUserClass from './IUserClass';
import IUser from './IUser';

export default interface IUsersRepository {
   getUserClassById(id: number): Promise<IUserClass>,
   getUserByEmail(email: string): Promise<IUser>,
   getUserPasswordById(id: number): Promise<{password: string}>,
   createUser(username: string, email: string, password: string, characterClass: number): Promise<IUser>,
   updateUser(id: number, username: string, password: string, characterClass: number): Promise<IUser>
}