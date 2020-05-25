import { Context, Meta } from 'koishi-core'
import searchImage from './search';

async function pixivSearch(ctx: Context) {
    const command = ctx.command('!s <content> [page]').alias('pixiv')
        .action(({ meta }, content, page) => searchImage(meta, content, page));

    // command.subcommand('search [content] [page]')
    //     .action(({ meta }, content, page) => searchImage(meta, content, page))
}

export = pixivSearch;