import db from '../db';
import IUsersRepository from '../interfaces/IUsersRepository';
import IUserClass from '../interfaces/IUserClass';
import IUserData from '../interfaces/IUserData';

export default class UsersRepository implements IUsersRepository {
   async getUserClassById(id: number) {
      const user = await db.query('SELECT username, class_id, name, health, damage, attack_type, ability  FROM users INNER JOIN classes ON users.id = $1 and classes.id = users.class_id', [id]);
      return user.rows[0] as Promise<IUserClass>;
   }

   async getUserByEmail(email: string) {
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      return user.rows[0] as Promise<IUserData>;
   }

   async getUserPasswordById(id: number) {
      const user = await db.query('SELECT password FROM users WHERE id = $1', [id]);
      return user.rows[0] as Promise<{password: string}>;
   }

   async createUser(username: string, email: string, password: string, characterClass: number) {
      const user = await db.query('INSERT INTO users (username, email, password, class_id, created_at, updated_at) VALUES ($1, $2, $3, $4, now(), now()) RETURNING *', [username, email, password, characterClass]);
      return user.rows[0] as Promise<IUserData>;
   }

   async updateUser(id: number, username: string, password: string, characterClass: number) {
      const user = await db.query('UPDATE users SET username = $2, password = $3, class_id = $4, updated_at = now() WHERE id = $1 RETURNING *', [id, username, password, characterClass]);
      return user.rows[0] as Promise<IUserData>;
   }
}