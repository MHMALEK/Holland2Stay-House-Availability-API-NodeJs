import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDto } from './notification.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}
  @Post('/new')
  CreateNewNotification(@Body() notificationPayload: CreateNotificationDto) {
    this.notificationService.createNewnotification(notificationPayload);
  }
}
