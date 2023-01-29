import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UnauthorizedError } from '../exceptions/ApiError';

export function generateTokens(payload: any) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY!, { expiresIn: '1h' });
      return {
         accessToken
      };
   }

export function validateAccessToken(token: any) {
      try {
         return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY!);
      } catch (e) {
         return null;
      }
   }

export function checkAccessToken(authorizationHeader: any) {
      if (!authorizationHeader) {
         throw new UnauthorizedError;
      }

      const token = authorizationHeader.split(' ')[1];
      if (!token) {
         throw new UnauthorizedError;
      }

      const userData = validateAccessToken(token);
      if (!userData) {
         throw new UnauthorizedError;
      }
   }