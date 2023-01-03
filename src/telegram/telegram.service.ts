import { HttpException, Injectable } from '@nestjs/common';
import { telegramSendMessage } from './bot-api-utils';
@Injectable()
export class TelegramService {
  async sendMessage(chatId: string, message: string) {
    try {
      await telegramSendMessage(chatId, message);
      return 'message sent successfully';
    } catch (e) {
      return new HttpException('Send message failed.', 500);
    }
  }
}
