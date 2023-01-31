import express from 'express';

import { loginUser, registrationUser, updateUser } from '../controllers/UserController';
import { getAllClasses } from '../controllers/ClassController';
import { validationRegistration, validationUpdate } from '../middleware/Validation';

import { authenticationHttp } from '../middleware/Authentication';

const router = express.Router();

router.post('/users/login', loginUser);
router.post('/users/new', validationRegistration, registrationUser);
router.patch('/users/:id', validationUpdate, authenticationHttp, updateUser);
router.get('/classes', authenticationHttp, getAllClasses);

export default router;