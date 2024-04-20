import express from "express";
import { authLogin, authRegister, emailVerify } from "./auth.controller";
import { myProfile } from "./user.controller";
import { authentication } from "../shared/authentication.middleware";


const userRouter = express.Router();

// User Auth routes
userRouter.post('/auth/login', [], authLogin);
userRouter.post('/auth/register', [], authRegister);
userRouter.post('/auth/email/verify', [], emailVerify);

userRouter.get('/me', [authentication], myProfile);

export default userRouter;