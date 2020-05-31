import { Context, Meta } from 'koishi-core';
import getRanking from './ranking';

async function pixivRanking(ctx: Context) {
    ctx.command('r [page] [mode] [content]', '获取排行')
        .alias('ranking')
        .action(({ meta, options }, page, mode, content) => getRanking(meta, options, page, mode, content));
}

export = pixivRanking;