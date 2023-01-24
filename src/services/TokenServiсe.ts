import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UnauthorizedError } from '../exceptions/ApiError';

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

   static checkAccessToken(authorizationHeader: any) {
      if (!authorizationHeader) {
         throw new UnauthorizedError;
      }

      const token = authorizationHeader.split(' ')[1];
      if (!token) {
         throw new UnauthorizedError;
      }

      const userData = TokenService.validateAccessToken(token);
      if (!userData) {
         throw new UnauthorizedError;
      }
   }
}

export default TokenService;