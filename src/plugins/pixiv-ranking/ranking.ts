import { Context, Meta, CommandOption } from 'koishi-core';
import { CQCode } from 'koishi-utils';
import { fetchRanking } from '../api';
import { r18Limit } from '../utils';

async function getRanking(meta: Meta, options: Record<string, any>, page?: string, mode?: string, content?: string) {
    const output = [];
    meta.$send('生成图片中');
    
    const results = await fetchRanking(+page, mode, content);
    const safeAgeLimited = r18Limit(results, true);

    safeAgeLimited.forEach(({ url, title, username }) => {
        output.push(CQCode.stringify('image', { file: url }));
        output.push(`标题: ${title}`);
        output.push(`作者: ${username}`);
    });

    meta.$send(output.join('\n'));
}

export default getRanking;
