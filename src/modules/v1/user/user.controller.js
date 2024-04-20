import { sendSuccessResponse } from "../../../utils/response"
import { UserSession } from "./session.model"
import { User } from "./user.model"


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const myProfile = (req, res) => {

    return sendSuccessResponse(res, { data: {
        user: req.user, session: req.session
    }});
}