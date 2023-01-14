import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/ApiError';
import { CharacterClasses } from '../config/enums';

const validUsername = /^[a-z0-9_-]{3,16}$/;
const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const minPassLength = 5;
const maxPassLength = 15;


function validationUsername(username: string) {
   if (!validUsername.test(username)) {
      throw ApiError.BadRequest('Invalid username');
   }
}

function validationEmail(email: string) {
   if (!validEmail.test(email)) {
      throw ApiError.BadRequest('Invalid email');
   }
}

function validationPassword(password: string) {
   if (password.length <= minPassLength) {
      throw ApiError.BadRequest(`Password must be longer than ${minPassLength} characters`);
   }
   if (password.length >= maxPassLength) {
      throw ApiError.BadRequest(`Password must be less than ${maxPassLength} characters`);
   }
}

function validationDuplicatePassword(password: string, duplicatePassword: string) {
   if (password !== duplicatePassword) {
      throw ApiError.BadRequest('Passwords do not match');
   }
}

function validationCharacterClass(characterClass: number) {
   if (!(characterClass in CharacterClasses)) {
      throw ApiError.BadRequest('The selected character class does not exist');
   }
}


class Validation {
   static registration(req: Request, res: Response, next: NextFunction) {
      const { username, email, password, duplicatePassword, characterClass } = req.body;

      validationUsername(username);

      validationEmail(email);

      validationPassword(password);

      validationDuplicatePassword(password, duplicatePassword);

      validationCharacterClass(characterClass);

      next();
   }

   static update(req: Request, res: Response, next: NextFunction) {
      const { username, currentPassword, newPassword, duplicateNewPassword, characterClass } = req.body;

      validationUsername(username);

      validationPassword(newPassword);

      validationDuplicatePassword(newPassword, duplicateNewPassword);

      validationCharacterClass(characterClass);

      next();
   }
}

export default Validation;
