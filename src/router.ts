import express from "express";
import { errorHandler } from "./middleware/errorHandler";

import {UserController} from "./controllers/UserController";
import {ClassController} from "./controllers/ClassController";
import {validationRegistration} from "./middleware/validationRegistration";

import {authentication} from "./middleware/authentication";

const router = express.Router();

router.post('/users/login', UserController.login);
router.post('/users/new', validationRegistration, UserController.registration);
router.patch('/users/:id', authentication.http, UserController.update);
router.get('/classes', authentication.http, ClassController.getAll);
router.use(errorHandler);

export {router};