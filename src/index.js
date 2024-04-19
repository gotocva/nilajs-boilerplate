import connect from "./config/db";
import app from "./config/express";

import dotenv from 'dotenv';
const env = dotenv.config().parsed;

connect();


import userRouter from "./modules/v1/user/user.routes";


/**
 * Modules route injection
 */

app.use('/v1/user', userRouter);


app.listen(env.PORT, () => {
    console.log(`Application running on port ${env.PORT}`);
});