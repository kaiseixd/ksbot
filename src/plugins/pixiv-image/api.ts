import querystring from 'querystring';
import axios from 'axios';

interface ApiResponse {
    age_limit: string;
    tags: string[];
    title: string;
    type: string;
    image_urls: {
        px_480mw: string;
    };
    user: {
        name: string;
    };
}

interface ApiData {
    data: {
        count: number;
        response: ApiResponse[];
        status: string;
    }
}

const baseUrl = 'https://api.imjad.cn/pixiv/v1';

async function fetchRank(mode: string = 'weekly', page: number = 1, content: string = 'illust') {
    const query = querystring.stringify({
        type: 'rank',
        mode,
        page,
        content,
        per_page: 10
    });
    const res = await axios.get(`${baseUrl}?${query}`);
    return res
}

async function fetchSearch(word: string, page: number = 1) {
    const query = querystring.stringify({
        type: 'search',
        word,
        page,
        per_page: 10
    });
    const res: ApiData = await axios.get(`${baseUrl}?${query}`);
    return parseResult(res.data.response);
}

function parseResult(results: ApiResponse[]) {
    const safeAgeLimited = results.filter(item => item.age_limit !== 'r18');
    return safeAgeLimited.map(result => ({
        title: result.title,
        url: proxyPixivUrl(result.image_urls.px_480mw),
        username: result.user.name,
    }));
}

function proxyPixivUrl(url: string) {
    return url.replace(/pximg\.net/, 'pixiv.cat');
}

export { fetchRank, fetchSearch };
