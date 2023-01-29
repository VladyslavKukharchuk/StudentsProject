import { checkAccessToken } from '../services/TokenServiсe';
import { Response, NextFunction } from 'express';

export function authenticationHttp(req: any, res: Response, next: NextFunction) {
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

export function authenticationWs(accessToken: any) {
   try {
      return checkAccessToken(accessToken);
   } catch (e) {
      throw e;
   }
}
