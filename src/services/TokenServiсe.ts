import jwt from 'jsonwebtoken';
import 'dotenv/config';
import Token from "../models/Token";

class TokenService {
   static generateTokens(payload: any) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY!, { expiresIn: "1h" });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY!, { expiresIn: "30d" });
      return {
         accessToken,
         refreshToken
      }
   }

   static validateAccessToken(token: any){
      try {
         const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY!);
         return userData;
      }catch (e){
         return null;
      }
   }

   static validateRefreshToken(token: any){
      try {
         const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY!);
         return userData;
      }catch (e){
         return null;
      }
   }

   static async saveToken(userId: any, refreshToken: any) {
      const tokenData = await Token.findOne({user: userId})
      if (tokenData) {
         tokenData.refreshToken = refreshToken;
         return tokenData.save();
      }
      const token = await Token.create({user: userId, refreshToken});
      return token;
   }

   static async removeToken(refreshToken: any) {
      const tokenData = await Token.deleteOne(refreshToken);
      return tokenData;
   }

   static async findToken(refreshToken: any) {
      const tokenData = await Token.findOne(refreshToken);
      return tokenData;
   }
}

export default TokenService;