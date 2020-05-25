import { Context, Meta, CommandOption } from 'koishi-core';
import { CQCode } from 'koishi-utils';
import { fetchSearch } from './api';

async function searchImage(meta: Meta, options: Record<string, any>, content?: string, page?: string) {
    const output = [];
    meta.$send('生成图片中');
    
    let searchText = content.split(',').join(' ');
    if (options.u) {
        const count = typeof options.u === 'string' ? options.u : '1000';
        searchText += ` ${count}users入り`;
    }
    const results = await fetchSearch(searchText, +page);

    const safeAgeLimited = options.r ? results : results.filter(item => item.age_limit !== 'r18');

    safeAgeLimited.forEach(({ url, title, username }) => {
        output.push(CQCode.stringify('image', { file: url }));
        output.push(`标题: ${title}`);
        output.push(`作者: ${username}`);
    });

    meta.$send(output.join('\n'));
}

export default searchImage;
