import { sendErrorResponse } from "../../../utils/response"
import { UserSession } from "../user/session.model";
import { User } from "../user/user.model";


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const authentication = async (req, res, next) => {
    if (!req.headers['authentication'] || !req.headers['session']) {
        return sendErrorResponse(res, { message: 'Unauthorized', statusCode: 401 });
    } else {
        req.user = await User.findOne({authentication_token: req.headers['authentication']}).exec();
        req.session = await UserSession.findOne({session_token: req.headers['session']}).exec();
        next();
    }
}