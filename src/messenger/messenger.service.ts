import { HttpException, Injectable } from '@nestjs/common';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class MessengerService {
  constructor(private telegramService: TelegramService) {}
  generateNotification(city, availableResidencies) {
    return `${availableResidencies} is available at ${city}`;
  }
  async sendNotification(user, city, availableResidencies) {
    try {
      await this.telegramService.sendMessage(
        user.telegramId,
        this.generateNotification(city, availableResidencies),
      );
      return 'successfull';
    } catch (e) {
      throw new HttpException('Something went wrong for send message', 500);
    }
  }
}
