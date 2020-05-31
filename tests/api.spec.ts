import { fetchRanking } from '../src/plugins/api'

describe('api', () => {
    test('fetch rank', async () => {
        const res = await fetchRanking()
        expect(res).toBe(1)
    })
})
