import jwt from 'jsonwebtoken';
import TokenService from '../services/TokenServiсe';
import 'dotenv/config';
import { Response, NextFunction } from 'express';
import { myEmitter } from '../app';
import ApiError from '../exceptions/ApiError';

class authentication {
   static http(req: any, res: Response, next: NextFunction) {
      if (req.method === 'OPTIONS') {
         next();
      }

      try {
         const authorizationHeader = req.headers.authorization;
         if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
         }

         const accessToken = authorizationHeader.split(' ')[1];
         if (!accessToken) {
            return next(ApiError.UnauthorizedError());
         }

         const userData = TokenService.validateAccessToken(accessToken);
         if (!userData) {
            return next(ApiError.UnauthorizedError());
         }

         req.user = userData;
         next();
      } catch (e) {
         return next(ApiError.UnauthorizedError());
      }
   }

   static ws(socket: any, next: any) {
      try {
         const authHeader = socket.handshake.headers.access_token;
         if (!authHeader) {
            return new Error('request without a token');
         }
         const token = authHeader.split(' ')[1];
         jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY!);

         console.log(authHeader);
         next();
      } catch (e) {
         myEmitter.emit('error', e);
         next(e);
      }
   }
}

export default authentication;
