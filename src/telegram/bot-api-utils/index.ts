import { Bot } from 'grammy';
import * as dotenv from 'dotenv';
import { initBotMenus } from './bot-menu';

dotenv.config();

let bot: Bot;
const telegramBotApiToken = process.env.TELEGRAM_BOT_API_TOKEN;

// 1949747267
const createBotInstance = (apiToken) => {
  const bot = new Bot(apiToken);
  return bot;
};

if (!bot) {
  bot = createBotInstance(telegramBotApiToken);
  bot.start();
}

process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());

bot.catch(console.error.bind(console));

initBotMenus(bot);

const telegramSendMessage = async (chatId: string, message: string) => {
  await bot.api.sendMessage(chatId, message);
};

export { bot as telegramBot, telegramSendMessage };
