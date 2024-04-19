import express from 'express';
import cors from 'cors';
import xssPrevention from '../utils/xss';
import { sendSuccessResponse } from '../utils/response';

const app = express();


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.use(xssPrevention);

app.disable('x-powered-by');

app.get('/', (req, res) => { return sendSuccessResponse(res, { message: 'Application api working fine'}) });
app.get('/PING', (req, res) => { return sendSuccessResponse(res, { message: 'PONG'}) });

export default app;