import { Request, Response, NextFunction } from "express";
import ClassService from "../services/ClassService";
import ClassesRepository from '../repositories/ClassesRepository';

const classService = new ClassService(new ClassesRepository())
   // возвращаем список доступных классов
   export async function getAllClasses(req: Request, res: Response, next: NextFunction) {
      await classService.getClasses()
         .then((classes) => res.status(200).json(classes))
         .catch((err) => next(err));
   }

