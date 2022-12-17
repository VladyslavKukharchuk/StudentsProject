import express from "express";
import { errorHandler } from "./middleware/errorHandler";

import {UserController} from "./controllers/UserController";
import {ClassController} from "./controllers/ClassController";
import {Middleware} from "./middleware/middleware";

import {authentication} from "./middleware/authentication";

const router = express.Router();

router.post('/users/login', UserController.login);
router.post('/users/new', UserController.registration);
router.patch('/users/:id', authentication, UserController.update);
router.get('/classes', authentication, ClassController.getAll);
router.use(errorHandler);

export {router};