import { HttpException, Injectable } from '@nestjs/common';
import { Notification } from 'src/notification/notification.schema';
import { TelegramService } from 'src/telegram/telegram.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessengerService {
  constructor(
    private telegramService: TelegramService,
    private userService: UserService,
  ) {}
  generateNotification(city, availableResidencies) {
    return `${availableResidencies} is available at ${city}`;
  }
  async sendNotification(userId, city, availableResidencies) {
    const { telegramId } = await this.userService.findUserById(userId);
    try {
      await this.telegramService.sendMessage(
        telegramId,
        this.generateNotification(city, availableResidencies),
      );
      return 'successfull';
    } catch (e) {
      throw new HttpException('Something went wrong for send message', 500);
    }
  }

  async sendNotificationToAllUsers(
    notifications: Notification[],
    availableResidencies: string,
  ) {
    notifications.map((notification) => {
      this.sendNotification(
        notification.userId,
        notification.houseId,
        availableResidencies,
      );
    });
  }
}
