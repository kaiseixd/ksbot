import { Context, Meta } from 'koishi-core';
import { CQCode } from 'koishi-utils';
import { fetchSearch } from './api';

async function searchImage(meta: Meta, content?: string, page?: string) {
    meta.$send('生成图片中');

    const output = [];
    const results = await fetchSearch(content, +page);

    results.forEach(({ url, title, username }) => {
        output.push(CQCode.stringify('image', { file: url }));
        output.push(`标题: ${title}`);
        output.push(`作者: ${username}`);
    });

    meta.$send(output.join('\n'));
}

export default searchImage;
