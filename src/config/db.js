
import mongoose from "mongoose"

import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const connect = () => {
    mongoose.connect(env.MONGODB_URL).then(() => {
        console.log('Mongodb connected successfully...');
    }).catch((error) => {
        console.error('Mongoose connection error', error);
        process.exit(-1);
    })
}


export default connect;