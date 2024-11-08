import { User } from "../models/UserModel";
import { UserMessages } from "../messages/messages";
import { successResponse, errorResponse } from "../../../utils/ResponseUtil";
import { HttpStatus } from "../../../utils/HttpUtil";
import bcrypt from 'bcrypt';
import EventPolicy from "../../../policies/EventPolicy";
import Events from "../../../common/Events";
import SessionService from "../services/SessionService";


class userAuthController {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async login(req, res) {
        try {
            const userlogin = await User.findOne({ email: req.body.email });

            if (!userlogin) {
                return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.USER_NOT_FOUND);
            }
            if (!await bcrypt.compare(req.body.password, userlogin.password)) {
                return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.PASSWORD);
            }

            const session = await SessionService.createSession(userlogin);
            return successResponse(res, HttpStatus.CREATED, UserMessages.LOGIN_SUCCESS, { userlogin, session });

        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.BAD_REQUEST, { message: error.message });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async logout(req, res) {
        try {
            const session = await UserSessionService.deleteSessionById(req.user.sessionId);
            return successResponse(res, HttpStatus.OK, UserMessages.LOGOUT_SUCCESS);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.BAD_REQUEST, { message: error.message });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async register(req, res) {
        try {

            // Check if the user already exists
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.USER_ALREADY_EXISTS);
            }

            // Create a new user
            const user = new User(req.body);

            const _user = await user.save();

            // trigger event USER_ACCOUNT_REGISTER_EVENT
            EventPolicy.triggerEvent(Events.USER_ACCOUNT_REGISTER_EVENT, _user);

            return successResponse(res, HttpStatus.CREATED, UserMessages.REGISTRATION_SUCCESS, user);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.BAD_REQUEST, { message: error.message });
        }
    }
}

export default new userAuthController();
