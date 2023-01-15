import jwt from 'jsonwebtoken';
import 'dotenv/config';
import TokensRepository from '../repositories/TokensRepository';

class TokenService {
   static generateTokens(payload: any) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY!, { expiresIn: '1h' });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY!, { expiresIn: '30d' });
      return {
         accessToken,
         refreshToken,
      };
   }

   static validateAccessToken(token: any) {
      try {
         const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY!);
         return userData;
      } catch (e) {
         return null;
      }
   }

   static validateRefreshToken(token: any) {
      try {
         const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY!);
         return userData;
      } catch (e) {
         return null;
      }
   }

   static async saveToken(userId: number, refreshToken: string) {
      const tokenData = await TokensRepository.getTokenByUserID(userId);
      if (tokenData) {
         const token = await TokensRepository.updateToken(userId, refreshToken);
         return token;
      }
      const token = await TokensRepository.createToken(userId, refreshToken);
      return token;
   }

   static async removeToken(refreshToken: any) {
      const tokenData = await TokensRepository.deleteToken(refreshToken);
      return tokenData;
   }

   static async findToken(refreshToken: string) {
      const tokenData = await TokensRepository.getTokenByTokenData(refreshToken);
      return tokenData;
   }
}

export default TokenService;