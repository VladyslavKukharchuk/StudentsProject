import { ClassService } from '../services/ClassService';
import { Request, Response, NextFunction } from 'express';

class ClassController {
   // возвращаем список доступных классов
   static async getAll(req: Request, res: Response, next: NextFunction) {
      await ClassService.getAll()
         .then((classes) => res.status(200).json(classes))
         .catch((err) => next(err));
   }
}

export { ClassController };
