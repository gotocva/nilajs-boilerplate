import { appInstance } from '../config/express';

const app = appInstance();

// module routes injection
import userRouter from "../app/user/routes/routes";
import AdminRouter from "../app/admin/routes/AdminRouter";

app.use('/api/v1/admin' , [], AdminRouter);
app.use('/api/v1/users', [], userRouter);


// import @core modules 
import * as core from '../@core/index';

export default app;