import dotenv from 'dotenv';
import pixivImage from './src/plugins/pixiv-image';

dotenv.config();

export = {
  type: "http",
  port: 8080,
  server: "http://localhost:5700",
  selfId: 2390355351,
  secret: process.env.COOLQ_SECRET,
  token: process.env.COOLQ_TOKEN,
  plugins: [
    "common",
    "schedule",
    pixivImage
  ]
}