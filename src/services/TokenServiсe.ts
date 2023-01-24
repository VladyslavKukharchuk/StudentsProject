import jwt from 'jsonwebtoken';
import 'dotenv/config';

class TokenService {
   static generateTokens(payload: any) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY!, { expiresIn: '1h' });
      return {
         accessToken
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
}

export default TokenService;