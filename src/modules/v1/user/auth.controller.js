import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { User } from "./user.model";
import { sendErrorResponse, sendSuccessResponse } from '../../../utils/response';
import { UserSession } from './session.model';

import dotenv from 'dotenv';
import { sendOtp } from '../../../emails/templates/otp';
const env = dotenv.config().parsed;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const authRegister = async (req, res) => {

    try {
        const userValidation = await User.findOne({ email: req.body.email }).select({_id:1}).exec();

        if (userValidation) {
            return sendErrorResponse(res, { message: 'Email id already exists', statusCode: 400 });
        }

        req.body.authentication_token = jwt.sign(req.body.email, env.JWT_SECRET);
        req.body.password = await bcrypt.hash(req.body.password, Number(env.BCRYPT_SALT_ROUND));
        req.body.otp = Number((Math.random() * (999999 - 111111) + 111111).toFixed())

        sendOtp(req.body.email, req.body.otp);

        const user = new User(req.body);

        await user.save();

        delete req.body.otp;
        
        return sendSuccessResponse(res, {
            message: 'New user account created successfully',
            data: req.body
        });
    } catch (error) {
        console.log('Error ', error);
    }
    
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const authLogin = async (req, res) => {

    
    const user = await User.findOne({ email: req.body.email }).select({ _id: 1, password: 1, authentication_token: 1, status: 1}).exec();

    if (!user) {
        return sendErrorResponse(res, { message: 'Email id not exists', statusCode: 400 });
    }

    if (user.status == 0) {
        return sendErrorResponse(res, { message: 'Your account is suspended', statusCode: 400 });
    }

    bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err){
          // handle error
          return sendErrorResponse(res, { message: 'Invalid password', statusCode: 400 });
        }
        if (result) {
          // credentials authentication completed need to create or update session
          createSession(req, res, user);
        } else {
          // response is OutgoingMessage object that server response http request
          return sendErrorResponse(res, { message: 'passwords do not match', statusCode: 400 });
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const emailVerify = async (req, res) => {

    const user = await User.findOne({authentication_token: req.body.authentication_token}).exec();

    if (!user) {
        return sendErrorResponse(res, { message: 'Invalid authentication token', statusCode: 400 });
    }

    if (user.otp != req.body.otp) {
        return sendErrorResponse(res, { message: 'Invalid OTP', statusCode: 400 });
    } else {
        user.email_verified = 1;
        user.save();
        createSession(req, res, user);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} user 
 */
const createSession = async (req, res, user) => {

    // create a new session 

    const session = {
        user_id: user._id,
        session_meta: req.body.session_meta,
        session_token: jwt.sign({email:user.email, _id: user._id}, env.JWT_SECRET)
    }

    const userSession = new UserSession(session);

    await userSession.save();

    return sendSuccessResponse(res, {
        message: 'User logged in successfully',
        data: { 
            authentication_token: user.authentication_token,
            session_token: userSession.session_token, 
            user_id: userSession.user_id 
        }
    })

}