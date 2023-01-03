import { Controller, Get } from '@nestjs/common';
import { CronjobService } from './cronjob.service';

@Controller('cronjob')
export class CronjobController {
  constructor(private croService: CronjobService) {}
  @Get('')
  getTest() {
    this.croService.cronjobFindAndNotifiyUsersIfAHouseAvailableInHollandToStay();
  }
}
