import { MockedApp } from 'koishi-test-utils'
import pixivSearch from '../src/plugins/pixiv-search' 

const app = new MockedApp()

app.plugin(pixivSearch)

describe('pixiv search', () => {
    test('normal search', async () => {
        await app.receiveMessage('user', '!s lize', 123)

        app.shouldHaveLastRequest('send_private_msg', {
            userId: 123,
        })
    })
})
