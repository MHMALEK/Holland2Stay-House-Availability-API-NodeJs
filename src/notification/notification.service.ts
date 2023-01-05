import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateNotificationDto } from './notification.dto';
import { Notification, NotificationDocument } from './notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    private userService: UserService,
  ) {}
  async createNewnotification(createNotificationDto: CreateNotificationDto) {
    const user = await this.findUserWhoCreateNotification(
      createNotificationDto,
    );

    const existingnotification = await this.findnotificationsForUser({
      userId: user.id,
      houseId: createNotificationDto.houseId,
    });

    if (existingnotification) {
      const updatednotification = await this.updateNotification({
        userId: user.id,
        houseId: createNotificationDto.houseId,
      });
      return updatednotification;
    }

    const creatednotification = new this.notificationModel({
      userId: user.id,
      houseId: createNotificationDto.houseId,
    });
    return creatednotification.save();
  }

  async findUserWhoCreateNotification({ email, telegramId }) {
    const user = await this.userService.findUserByTelegramOrEmail({
      email,
      telegramId,
    });
    if (!user) {
      throw new HttpException('User Not found', 404);
    }
    return user;
  }
  async findnotificationsForUser({ userId, houseId }) {
    const notification = await this.notificationModel.findOne({
      userId: userId,
      houseId,
    });

    return notification;
  }

  async updateNotification({ userId, houseId }) {
    const notification = await this.notificationModel.findOneAndUpdate({
      userId: userId,
      houseId,
    });
    return notification;
  }

  async getnotificationsList() {
    const notifications = await this.notificationModel.find();
  }
  async findNotificationForSpeceficHouse(houseId: string) {
    const notifications = await this.notificationModel.find({
      houseId,
    });
    if (notifications.length > 0) {
      return notifications;
    }
    return null;
  }
}
