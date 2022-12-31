import { Request, Response, NextFunction } from "express";
import { ValidationError } from "./errorHandler";

function validationRegistration(req: Request, res: Response, next: NextFunction) {
   const { username, email, password, duplicatePassword } = req.body;

   const validUsername = /^[a-z0-9_-]{3,16}$/;
   if (!validUsername.test(username)) {
      throw new ValidationError("Invalid username", username);
   }

   const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
   if (!validEmail.test(email)) {
      throw new ValidationError("Invalid email", email);
   }

   const minPassLength = 5;
   const maxPassLength = 15;
   if (password.length <= minPassLength) {
      throw new ValidationError(`The password must be longer than ${minPassLength} characters.`, password);
   }
   if (password.length >= maxPassLength) {
      throw new ValidationError(`The password must be less than ${maxPassLength} characters.`, password);
   }

   if (password !== duplicatePassword) {
      throw new ValidationError("Passwords do not match", duplicatePassword);
   }

   next();
}

export { validationRegistration };
