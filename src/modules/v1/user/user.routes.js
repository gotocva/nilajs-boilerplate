import express from "express";
import { authLogin, authRegister } from "./auth.controller";


const userRouter = express.Router();


userRouter.post('/auth/login', [], authLogin);
userRouter.post('/auth/register', [], authRegister);


export default userRouter;