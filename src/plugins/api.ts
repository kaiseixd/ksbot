import querystring from 'querystring';
import axios from 'axios';

export interface RankingResponse {
    previous_rank: number;
    rank: number;
    work: ApiResponse;
};
export interface ApiResponse {
    age_limit: string;
    tags: string[];
    title: string;
    type: string;
    image_urls: {
        px_480mw: string;
    };
    user: {
        name: string;
        id: number;
    };
    stats: {
        views_count: number;
        favorited_count: {
            public: number;
        };
    };
    sanity_level: string;
};
type UnPromisify<T> = T extends Promise<infer U> ? U : T;
export type ApiResult = UnPromisify<ReturnType<typeof fetchRanking>>;
interface ApiData {
    data: {
        count: number;
        response: ApiResponse[];
        status: string;
    }
};

const baseUrl = 'https://api.imjad.cn/pixiv/v1';

async function fetchRanking(page: number = 1, mode: string = 'weekly', content: string = 'illust') {
    const query = querystring.stringify({
        type: 'rank',
        mode,
        page,
        content,
        per_page: 10
    });
    const res = await axios.get(`${baseUrl}?${query}`);
    return parseRankingResult(res.data.response[0].works);
}

async function fetchSearch(word: string, page: number = 1) {
    const query = querystring.stringify({
        type: 'search',
        word,
        page,
        per_page: 10
    });
    const res: ApiData = await axios.get(`${baseUrl}?${query}`);
    return parseSearchResult(res.data.response);
}

async function fetchMember(memberId: string, page: number = 1) {
    const query = querystring.stringify({
        type: 'member_illust',
        id: memberId,
        page,
        per_page: 10
    });
    const res: ApiData = await axios.get(`${baseUrl}?${query}`);
    return parseSearchResult(res.data.response);
}

function parseRankingResult(results: RankingResponse[]) {
    return results.map(result => ({
        age_limit: result.work.age_limit,
        sanity: result.work.sanity_level,
        title: result.work.title,
        url: proxyPixivUrl(result.work.image_urls.px_480mw),
        username: result.work.user.name,
        userId: result.work.user.id,
        favoritedCount: result.work.stats.favorited_count.public,
        viewsCount: result.work.stats.views_count,
    }));
}

function parseSearchResult(results: ApiResponse[]) {
    return results.map(result => ({
        age_limit: result.age_limit,
        sanity: result.sanity_level,
        title: result.title,
        url: proxyPixivUrl(result.image_urls.px_480mw),
        username: result.user.name,
        userId: result.user.id,
        favoritedCount: result.stats.favorited_count.public,
        viewsCount: result.stats.views_count,
    }));
}

function proxyPixivUrl(url: string) {
    return url.replace(/pximg\.net/, 'pixiv.cat');
}

export { fetchRanking, fetchSearch, fetchMember };
