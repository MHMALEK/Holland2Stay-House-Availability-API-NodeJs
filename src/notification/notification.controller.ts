import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateNotificationDto } from './notification.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}
  @Post('/new')
  async CreateNewNotification(
    @Body() notificationPayload: CreateNotificationDto,
  ) {
    try {
      await this.notificationService.createNewnotification(notificationPayload);
      return 'Notification created';
    } catch (e) {
      throw new HttpException('Something went wrong', 500);
    }
  }
}
