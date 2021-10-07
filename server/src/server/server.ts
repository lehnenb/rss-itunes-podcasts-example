import { config as dotenv } from 'dotenv';

dotenv();

import Koa from 'koa';
import cors from '@koa/cors';

import { config } from './config';
import { logger } from '../middlewares/logging';
import { errors } from '../middlewares/errors';
import { routes } from './routes';

const application: Koa = new Koa();

application.use(logger);
application.use(cors());
application.use(errors);
application.use(routes);
export const server = application.listen(config.port);

console.log(`Server running on port ${config.port}`);
