import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UnauthorizedError } from '../exceptions/ApiError';
import UserDto from '../dtos/UserDto';

export function generateTokens(payload: UserDto) {
   const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY!, { expiresIn: '1h' });
   return {
      accessToken,
   };
}

export function validateAccessToken(token: string) {
   try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY!);
   } catch (e) {
      return null;
   }
}

export function checkAccessToken(authorizationHeader: string | undefined) {
   if (!authorizationHeader) {
      throw new UnauthorizedError;
   }

   const token = authorizationHeader.split(' ')[1];
   if (!token) {
      throw new UnauthorizedError;
   }

   const userData = validateAccessToken(token) as UserDto;
   if (!userData) {
      throw new UnauthorizedError;
   }

   return userData;
}