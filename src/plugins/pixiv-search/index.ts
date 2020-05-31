import { Context, Meta } from 'koishi-core';
import searchImage from './search';

async function pixivSearch(ctx: Context) {
    ctx.command('s <content> [page]', '搜索插画')
        .alias('search')
        .option('-u [count]', '[count]users入り')
        .option('-r', '取消r18限制')
        .option('-m', '用户id搜索')
        .action(({ meta, options }, content, page) => searchImage(meta, options, content, page));
}

export = pixivSearch;