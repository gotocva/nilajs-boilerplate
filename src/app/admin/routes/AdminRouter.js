import express from 'express';
import AdminController from '../controllers/AdminController';

const adminRouter = express.Router();

adminRouter.get('/', AdminController.listAdmins);
adminRouter.post('/', AdminController.createAdmin);
adminRouter.get('/:id', AdminController.getAdmin);
adminRouter.put('/:id', AdminController.updateAdmin);
adminRouter.delete('/:id', AdminController.deleteAdmin);

export default adminRouter;