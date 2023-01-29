import { getClasses } from "../services/ClassService";
import { Request, Response, NextFunction } from "express";

   // возвращаем список доступных классов
   export async function getAllClasses(req: Request, res: Response, next: NextFunction) {
      await getClasses()
         .then((classes) => res.status(200).json(classes))
         .catch((err) => next(err));
   }

