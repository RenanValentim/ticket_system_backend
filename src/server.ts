import express from 'express';
import swaggerUi from 'swagger-ui-express';

import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { router } from './routes/index';
import prismaClient from './database/prismaClient';
import { errorHandler } from './middleware/errorHandler';

dotenv.config({ path: path.join(__dirname, '../', '.env') });
const server = express();
const port = process.env.PORT || 3000;
const server_HOST = process.env.APP_HOST;

prismaClient
  .$connect()
  .then(() => {
    console.log('Database has connected');
    server.use(cors());

    server.use(express.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use(router);
    server.use(errorHandler);

    server.listen(port, () => {
      console.log(
        `Server is running on port ${port}\nAPI documentation => ${server_HOST}:${port}/api-docs`,
      );
    });
  })
  .catch(err => {
    console.log('ERROR DATABASE =>', err.message);
  });
