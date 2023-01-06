import { Request, Response, NextFunction } from "express";
import ApiError from '../exceptions/ApiError';

function validationUserData(req: Request, res: Response, next: NextFunction) {
   const { username, email, password, duplicatePassword } = req.body;

   const validUsername = /^[a-z0-9_-]{3,16}$/;
   if (!validUsername.test(username)) {
      throw ApiError.BadRequest("Invalid username");
   }

   const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
   if (!validEmail.test(email)) {
      throw ApiError.BadRequest("Invalid email");
   }

   const minPassLength = 5;
   const maxPassLength = 15;
   if (password.length <= minPassLength) {
      throw ApiError.BadRequest(`Password must be longer than ${minPassLength} characters`);
   }
   if (password.length >= maxPassLength) {
      throw ApiError.BadRequest(`Password must be less than ${maxPassLength} characters`);
   }

   if (password !== duplicatePassword) {
      throw ApiError.BadRequest("Passwords do not match");
   }

   next();
}

export default validationUserData;
