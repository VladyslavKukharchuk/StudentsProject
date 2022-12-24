import jwt from 'jsonwebtoken';
import { secret } from '../config/jwtKey';
import { Response, NextFunction } from 'express';

class authentication {
   static http(req: any, res: Response, next: NextFunction) {
      if (req.method === 'OPTIONS') {
         next();
      }

      try {
         const authHeader = req.headers.authorization;
         if (!authHeader) {
            throw new Error('request without a token');
         }
         const token = authHeader.split(' ')[1];
         req.user = jwt.verify(token, secret);
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
         jwt.verify(token, secret);

         console.log(authHeader);
         next();
      } catch (e) {
         next(e);
      }
   }
}

export { authentication };
