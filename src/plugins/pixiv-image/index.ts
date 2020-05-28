import { Context, Meta } from 'koishi-core'
import searchImage from './search';

async function pixivSearch(ctx: Context) {
    const command = ctx.command('!s <content> [page]', '搜索插画')
        .alias('search')
        .option('-u [count]', '[count]users入り')
        .option('-r', '取消r18限制')
        .action(({ meta, options }, content, page) => searchImage(meta, options, content, page));

    // command.subcommand('search [content] [page]')
    //     .action(({ meta }, content, page) => searchImage(meta, content, page))
}

export = pixivSearch;