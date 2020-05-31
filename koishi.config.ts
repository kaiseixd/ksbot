import dotenv from 'dotenv';
import pixivImage from './src/plugins/pixiv-search';
import pixivRanking from './src/plugins/pixiv-ranking';

dotenv.config();

export = {
  type: "http",
  port: process.env.BOT_PORT,
  server: process.env.NODE_ENV === 'development' ? process.env.CQHTTP_SERVER_DEV_URL : process.env.CQHTTP_SERVER_URL,
  selfId: process.env.QQ_ACCOUNT,
  secret: process.env.COOLQ_SECRET,
  token: process.env.COOLQ_TOKEN,
  plugins: [
    "common",
    "schedule",
    pixivImage,
    pixivRanking
  ]
}