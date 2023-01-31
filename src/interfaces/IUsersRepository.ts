import IUserClass from './IUserClass';
import IUserData from './IUserData';

export default interface IUsersRepository {
   getUserClassById(id: number): Promise<IUserClass>,
   getUserByEmail(email: string): Promise<IUserData>,
   getUserPasswordById(id: number): Promise<{password: string}>,
   createUser(username: string, email: string, password: string, characterClass: number): Promise<IUserData>,
   updateUser(id: number, username: string, password: string, characterClass: number): Promise<IUserData>
}