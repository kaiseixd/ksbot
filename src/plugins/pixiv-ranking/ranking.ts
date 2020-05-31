import { Context, Meta, CommandOption } from 'koishi-core';
import { fetchRanking } from '../api';
import { r18Limit, sanityLimit, formatResult } from '../utils';

async function getRanking(meta: Meta, options: Record<string, any>, page?: string, mode?: string, content?: string) {
    const results = await fetchRanking(+page, mode, content);
    const safeAgeLimited = r18Limit(results, true);
    const safeSanityLimited = sanityLimit(safeAgeLimited);
    const output = formatResult(safeSanityLimited);

    const length = safeSanityLimited.length;
    meta.$send(`找到${length}个结果${length ? '，下载中' : ''}`);
    meta.$send(output.join('\n'));
}

export default getRanking;
