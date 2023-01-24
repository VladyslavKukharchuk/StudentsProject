import TokenService from '../services/TokenServiсe';
import { Response, NextFunction } from 'express';

class Authentication {
   static http(req: any, res: Response, next: NextFunction) {
      if (req.method === 'OPTIONS') {
         next();
      }

      try {
         const authorizationHeader = req.headers.authorization;
         TokenService.checkAccessToken(authorizationHeader);

         next();
      } catch (e) {
         return next(e);
      }
   }

   static ws(accessToken: any) {
      try {
         TokenService.checkAccessToken(accessToken);
      } catch (e) {
         throw e;
      }
   }
}

export default Authentication;
