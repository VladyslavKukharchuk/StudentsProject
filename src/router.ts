import express from "express";

import UserController from "./controllers/UserController";
import ClassController from "./controllers/ClassController";
import Validation from "./middleware/Validation";

import Authentication from "./middleware/Authentication";

const router = express.Router();

router.post("/users/login", UserController.login);
router.post("/users/new", Validation.registration, UserController.registration);
router.patch("/users/:id", Validation.update, Authentication.http, UserController.update);
router.get("/users/refresh", UserController.refresh);
router.post("/users/logout", UserController.logout);
router.get("/classes", Authentication.http, ClassController.getAll);

export {router};