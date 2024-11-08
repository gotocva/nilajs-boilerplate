import { Admin } from '../models/AdminModel';

class AdminService {
    
    async createAdmin(adminData) {
        const admin = new Admin(adminData);
        return await admin.save();
    }

    async listAdmins() {
        return await Admin.find();
    }

    async getAdminById(id) {
        return await Admin.findById(id);
    }

    async updateAdminById(id, adminData) {
        return await Admin.findByIdAndUpdate(id, adminData, { new: true });
    }

    async deleteAdminById(id) {
        return await Admin.findByIdAndDelete(id);
    }
}

export default new AdminService();