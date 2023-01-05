import { Injectable } from '@nestjs/common';
import { Holland2stayService } from 'src/holland2stay/holland2stay.service';
import { NotificationService } from 'src/notification/notification.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MessengerService } from 'src/messenger/messenger.service';
import { User } from 'src/user/user.schema';

@Injectable()
export class CronjobService {
  constructor(
    private h2sService: Holland2stayService,
    private notificationService: NotificationService, // private messengetService: MessengerService,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_11AM)
  async cronjobFindAndNotifiyUsersIfAHouseAvailableInHollandToStay() {
    const allHollandToStayHouses =
      await this.h2sService.fetchAllAvailableForRentHousesForAllCities();
    const allAvailablHollandTwoStayHouses = allHollandToStayHouses.filter(
      (house) => house.totalHomeAvailable,
    );

    console.log(allAvailablHollandTwoStayHouses);

    const users = [];
    for (let i = 0; i < allAvailablHollandTwoStayHouses.length; i++) {
      const result =
        await this.notificationService.findNotificationForSpeceficHouse(
          String(allAvailablHollandTwoStayHouses[i].houseId),
        );
      if (result) {
        console.log(allAvailablHollandTwoStayHouses, result);

        users.push({ ...result });
      }
    }
    // this.messengetService.sendNotificationToAllUsers(users);
  }
}
