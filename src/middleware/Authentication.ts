import TokenService from '../services/TokenServiсe';
import { Response, NextFunction } from 'express';
import { UnauthorizedError } from '../exceptions/ApiError';

function checkAccessToken(authorizationHeader: any) {
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

class Authentication {
   static http(req: any, res: Response, next: NextFunction) {
      if (req.method === 'OPTIONS') {
         next();
      }

      try {
         const authorizationHeader = req.headers.authorization;
         checkAccessToken(authorizationHeader);

         next();
      } catch (e) {
         return next(e);
      }
   }

   static ws(accessToken: any) {
      try {
         checkAccessToken(accessToken);
      } catch (e) {
         throw e;
      }
   }
}

export default Authentication;
