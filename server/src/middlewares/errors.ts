import { Context, Next } from 'koa';
import { InvalidInputError } from '../errors/invalid_input_error';
import { ResourceNotFoundError } from '../errors/resource_not_found_error';

export async function errors(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (e) {
    switch (true) {
      case e instanceof InvalidInputError:
        ctx.throw(e.message, 422);
        break;
      case e instanceof ResourceNotFoundError:
        ctx.throw(e.message, 404);
        break;
    }
  }
}
