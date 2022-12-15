import express from "express";

import { UserController } from "./controllers/UserController";
import { ClassController } from "./controllers/ClassController";

const router = express.Router();

router.post('/users/login', UserController.login);
router.post('/users/new', UserController.registration);
router.patch('/users/:id',  UserController.update);
router.get('/classes',  ClassController.getAll);

export { router };