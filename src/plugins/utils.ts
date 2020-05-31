import { ApiResult } from './api';

export function r18Limit(list: ApiResult, flag: boolean) {
    return flag ? list.filter(item => item.age_limit !== 'r18') : list;
}