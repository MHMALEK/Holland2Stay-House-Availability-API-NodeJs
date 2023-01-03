import { Controller, Get } from '@nestjs/common';
import { Holland2stayService } from './holland2stay.service';

@Controller('holland2stay')
export class Holland2stayController {
  constructor(private h2sService: Holland2stayService) {}
  @Get('/')
  async getHello() {
    // this.h2sService.fetchAllAvailableForRentHousesByCityId();
    this.h2sService.fetchAllAvailableForRentHousesForAllCities();
  }
}
