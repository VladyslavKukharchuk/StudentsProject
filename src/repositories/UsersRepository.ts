import db from "../db";

class UserRepository {
   static async getUserByEmail(email: string){
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      return user.rows[0];
   }

   static async getUserPasswordById(id: number){
      const user = await db.query('SELECT password FROM users WHERE id = $1', [id]);
      return user.rows[0];
   }

   static async createUser(username: string, email: string, password: string, characterClass : number){
      const user = await db.query('INSERT INTO users (username, email, password, class_id, created_at, updated_at) VALUES ($1, $2, $3, $4, now(), now()) RETURNING *', [username, email, password, characterClass]);
      return user.rows[0];
   }

   static async updateUser(id: number, username: string, password: string, characterClass : number){
      const user = await db.query('UPDATE users SET username = $2, password = $3, class_id = $4, updated_at = now() WHERE id = $1 RETURNING *', [id, username, password, characterClass]);
      return user.rows[0];
   }
}

export default UserRepository;