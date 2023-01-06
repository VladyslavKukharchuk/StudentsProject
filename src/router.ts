import express from "express";

import UserController from "./controllers/UserController";
import ClassController from "./controllers/ClassController";
import validationUserData from "./middleware/validationRegistration";

import authentication from "./middleware/authentication";

const router = express.Router();

router.post("/users/login", UserController.login);
router.post("/users/new", validationUserData, UserController.registration);
router.patch("/users/:id", validationUserData, authentication.http, UserController.update);
router.get("/users/refresh", UserController.refresh);
router.post("/users/logout", UserController.logout);
router.get("/classes", authentication.http, ClassController.getAll);

export {router};