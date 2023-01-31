import { checkAccessToken } from '../services/TokenServiсe';
import { Response, NextFunction, Request } from 'express';

export function authenticationHttp(req: Request, res: Response, next: NextFunction) {
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

export function authenticationWs(accessToken: string | undefined) {
   try {
      return checkAccessToken(accessToken);
   } catch (e) {
      throw e;
   }
}
