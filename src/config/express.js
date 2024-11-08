import express from 'express';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import requestIp from "request-ip";
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { docs } from '../docs/swagger';

/**
* Express instance
* @public
*/
const app = express();

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// request IP middleware
app.use(requestIp.mw());

// Set up rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: process.env.REQUEST_PER_MINUTE || 100, // Limit each IP to 100 requests per `windowMs`
  message: 'Too many requests from this IP, please try again after 15 minutes',
  headers: true, // Include rate limit info in the `RateLimit-*` headers
});

// Apply rate limiting to all requests
app.use(limiter);

// Initialize Swagger after app setup
app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs, { explorer: true }));

/**
 * Export the Express app instance
 */
export const appInstance = () => {
  return app;
}
