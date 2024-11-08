import { HttpStatus } from '../../../utils/HttpUtil';
import { errorResponse, successResponse } from '../../../utils/ResponseUtil';
import { AdminMessages } from '../messages/AdminMessages'; 
import AdminService from '../services/AdminService';

class AdminController {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async createAdmin(req, res) {
        try {
            const admin = await AdminService.createAdmin(req.body);
            return successResponse(res, HttpStatus.CREATED, AdminMessages.ADMIN_CREATED, admin);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, AdminMessages.BAD_REQUEST, { message: error.message });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async listAdmins(req, res) {
        try {
            const admins = await AdminService.listAdmins();
            return successResponse(res, HttpStatus.OK, AdminMessages.OK, admins);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, AdminMessages.BAD_REQUEST, { message: error.message });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async getAdmin(req, res) {
        try {
            const admin = await AdminService.getAdminById(req.params.id);
            if (!admin) return errorResponse(res, HttpStatus.BAD_REQUEST, AdminMessages.ADMIN_NOT_FOUND, { message: AdminMessages.ADMIN_NOT_FOUND });
            return successResponse(res, HttpStatus.OK, AdminMessages.OK, admin);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, AdminMessages.BAD_REQUEST, { message: error.message });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async updateAdmin(req, res) {
        try {
            const admin = await AdminService.updateAdminById(req.params.id, req.body);
            if (!admin) return res.status(404).json({ message: 'Admin not found' });
            res.json(admin);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, AdminMessages.BAD_REQUEST, { message: error.message });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async deleteAdmin(req, res) {
        try {
            const admin = await AdminService.deleteAdminById(req.params.id);
            if (!admin) return res.status(404).json({ message: 'Admin not found' });
            res.json({ message: 'Admin deleted' });
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, AdminMessages.BAD_REQUEST, { message: error.message });
        }
    }
}

export default new AdminController();