import jwt from 'jsonwebtoken';
import { TokenServise } from '../services/TokenServise';
import 'dotenv/config';
import { Response, NextFunction } from 'express';
import { myEmitter } from '../app';

class authentication {
   static http(req: any, res: Response, next: NextFunction) {
      if (req.method === 'OPTIONS') {
         next();
      }

      try {
         const authorizationHeader = req.headers.authorization;
         if (!authorizationHeader) {
            return next(new Error('request without a token'));
         }

         const accessToken = authorizationHeader.split(' ')[1];
         if (!accessToken) {
            return next(new Error('request without a token'));
         }

         const userData = TokenServise.validateAccessToken(accessToken);
         if (!userData) {
            return next(new Error('request without a token'));
         }

         req.user = userData;
         next();
      } catch (e) {
         next(e);
      }
   }

   static ws(socket: any, next: any) {
      try {
         const authHeader = socket.handshake.headers.access_token;
         if (!authHeader) {
            throw new Error('request without a token');
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

export { authentication };
