import dotenv from 'dotenv';
import { createServer } from "http";
import socketIo from 'socket.io';

// load .env variables into process.env
dotenv.config();

import app from './bootstrap/app';
import { converter, notFound, handler } from './utils/ErrorUtil';
import { connectDB } from './config/mongoose';
import { commonSocket } from './sockets';

// connect mongodb
connectDB();

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(handler);

const httpServer = createServer(app);

// Attach socket.io to the server
const io = socketIo(httpServer);

// IO socket instance to handler function
commonSocket(io);

// using set method to mount the `io` instance on the app to avoid usage of `global`
app.set("io", io); 

httpServer.listen(process.env.PORT, () => {
    console.log(`Application running on port ${process.env.PORT}`);
});

