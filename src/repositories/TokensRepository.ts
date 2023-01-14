import db from "../db";

class TokensRepository {
   static async getTokenByUserID(id: number){
      const user = await db.query('SELECT * FROM tokens WHERE user_id = $1', [id]);
      return user.rows[0];
   }

   static async createToken(id: number, refreshToken: string){
      const user = await db.query('INSERT INTO tokens (user_id, refreshtoken) VALUES ($1, $2) RETURNING *', [id, refreshToken]);
      return user.rows[0];
   }

   static async updateToken(id: number, refreshToken: string){
      const user = await db.query('UPDATE tokens SET refreshtoken = $2 WHERE user_id = $1 RETURNING *', [id, refreshToken]);
      return user.rows[0];
   }
}

export default TokensRepository;