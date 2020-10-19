import { Context } from 'koa';
import { getByID } from '../services/podcast_service';

export async function show(ctx: Context): Promise<void> {
   const itunesData = await getByID(ctx.params.id);
   ctx.response.body = itunesData;
}
