import { config as dotenv } from 'dotenv';

dotenv();

import Koa from 'koa';
import { config } from './config';
import { logger } from './logging';
import { routes } from './routes';

const application: Koa = new Koa();

application.use(logger);
application.use(routes);
export const server = application.listen(config.port);

console.log(`Server running on port ${config.port}`);
