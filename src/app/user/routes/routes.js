import express from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import { UserAuth } from '../middelwares/UserAuthMiddelware';
import SessionController from '../controllers/SessionController';

const userRouter = express.Router();

// basic user CRUD routes
userRouter.get('/', UserController.listUsers);
userRouter.post('/', UserController.createUser);
userRouter.get('/:id', UserController.getUser);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

//user auth routes
userRouter.post('/login' ,AuthController.login);
userRouter.post('/register' ,AuthController.register);

// User session routes
userRouter.get('/session/', [], SessionController.listSessions);
userRouter.post('/session', [], SessionController.createSession);
userRouter.get('/session/:id', [], SessionController.getSession);
userRouter.put('/session/:id', [], SessionController.updateSession);
userRouter.delete('/session/:id', [], SessionController.deleteSession);

export default userRouter;