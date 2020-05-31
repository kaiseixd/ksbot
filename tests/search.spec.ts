import { MockedApp } from 'koishi-test-utils'
import pixivImage from '../src/plugins/pixiv-image' 

const app = new MockedApp()

app.plugin(pixivImage)

describe('pixiv image', () => {
    test('search command', async () => {
        await app.receiveMessage('user', '!s lize', 123)

        app.shouldHaveLastRequest('send_private_msg', {
            userId: 123,
        })
    })
})
