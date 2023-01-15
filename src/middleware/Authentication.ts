import TokenService from '../services/TokenServiсe';
import { Response, NextFunction } from 'express';
import { myEmitter } from '../app';
import ApiError from '../exceptions/ApiError';

function checkAccessToken(authorizationHeader: any) {
   if (!authorizationHeader) {
      throw ApiError.UnauthorizedError();
   }

   const accessToken = authorizationHeader.split(' ')[1];
   if (!accessToken) {
      throw ApiError.UnauthorizedError();
   }

   const userData = TokenService.validateAccessToken(accessToken);
   if (!userData) {
      throw ApiError.UnauthorizedError();
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

   static ws(socket: any, next: any) {
      try {
         const authorizationHeader = socket.handshake.headers.access_token;
         checkAccessToken(authorizationHeader);

         next();
      } catch (e) {
         myEmitter.emit('error', e);
      }
   }
}

export default Authentication;
