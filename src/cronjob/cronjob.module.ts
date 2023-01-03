import { Module } from '@nestjs/common';
import { Holland2stayModule } from 'src/holland2stay/holland2stay.module';
import { NotificationModule } from 'src/notification/notification.module';
import { CronjobController } from './cronjob.controller';
import { CronjobService } from './cronjob.service';

@Module({
  controllers: [CronjobController],
  providers: [CronjobService],
  imports: [NotificationModule, Holland2stayModule],
})
export class CronjobModule {}
