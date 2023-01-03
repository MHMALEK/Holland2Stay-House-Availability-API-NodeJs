import { Controller, Get, Param } from '@nestjs/common';
import { Holland2stayService } from './holland2stay.service';

@Controller('holland2stay')
export class Holland2stayController {
  constructor(private h2sService: Holland2stayService) {}
  @Get('/:cityId')
  async getAvailableHouseByCityId(@Param() param) {
    const { cityId } = param;
    const res = this.h2sService.fetchAllAvailableForRentHousesByCityId(cityId);
    return res;
  }
}
