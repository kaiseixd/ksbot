import { CQCode } from 'koishi-utils';
import { ApiResult } from './api';

export function statsLimit(list: ApiResult) {
    return list.filter(item => item.viewsCount > 500 || item.favoritedCount > 50);
}

export function r18Limit(list: ApiResult, flag: boolean) {
    return flag ? list.filter(item => item.age_limit !== 'r18') : list;
}

export function sanityLimit(list: ApiResult) {
    return list.filter(item => item.sanity === 'white');
}

export function formatResult(list: ApiResult) {
    const output = [];

    list.forEach(({ url, title, username, userId }) => {
        output.push(CQCode.stringify('image', { file: url }));
        output.push(`标题: ${title}`);
        output.push(`作者: ${username}/${userId}`);
    });

    return output;
}