import { Injectable } from '@nestjs/common';
import { Holland2stayService } from 'src/holland2stay/holland2stay.service';
import { NotificationService } from 'src/notification/notification.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronjobService {
  constructor(
    private h2sService: Holland2stayService,
    private notificationService: NotificationService,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_11AM)
  async cronjobFindAndNotifiyUsersIfAHouseAvailableInHollandToStay() {
    const allHollandTwoStayHouses =
      await this.h2sService.fetchAllAvailableForRentHousesForAllCities();
    const allAvailablHollandTwoStayHouses = allHollandTwoStayHouses.filter(
      (house) => house.totalHomeAvailable,
    );

    const users = [];
    for (let i = 0; i < allAvailablHollandTwoStayHouses.length; i++) {
      const result =
        await this.notificationService.findNotificationForSpeceficHouse(
          String(allAvailablHollandTwoStayHouses[i].houseId),
        );
      if (result) {
        users.push({ ...result });
      }
    }
  }
}
