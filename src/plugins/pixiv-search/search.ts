import { Context, Meta, CommandOption } from 'koishi-core';
import { fetchSearch, fetchMember } from '../api';
import { statsLimit, r18Limit, sanityLimit, formatResult } from '../utils';

async function searchImage(meta: Meta, options: Record<string, any>, content: string, page?: string) {
    const results = await getResult(options, content, page);

    // todo: compose
    const statsLimited = statsLimit(results);
    const safeAgeLimited = r18Limit(statsLimited, !options.r);
    const safeSanityLimited = sanityLimit(safeAgeLimited);
    const output = formatResult(safeSanityLimited);

    const length = safeSanityLimited.length;
    meta.$send(`找到${length}个结果，过滤${results.length - length}个结果${length ? '，下载中' : ''}`);
    meta.$send(output.join('\n'));
}

async function getResult(options: Record<string, any>, content: string, page?: string) {
    let searchText = content.split(',').join(' ');

    if (options.m) {
        return fetchMember(content, +page);
    }
    if (options.u) {
        const count = typeof options.u === 'string' ? options.u : '1000';
        searchText += ` ${count}users入り`;
    }

    return fetchSearch(searchText, +page);
}

export default searchImage;
