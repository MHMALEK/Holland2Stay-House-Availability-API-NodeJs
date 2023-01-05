import { Module } from '@nestjs/common';
import { Holland2stayModule } from 'src/holland2stay/holland2stay.module';
import { MessengerModule } from 'src/messenger/messenger.module';
import { MessengerService } from 'src/messenger/messenger.service';
import { NotificationModule } from 'src/notification/notification.module';
import { CronjobController } from './cronjob.controller';
import { CronjobService } from './cronjob.service';

@Module({
  controllers: [CronjobController],
  providers: [CronjobService, MessengerService],
  imports: [NotificationModule, Holland2stayModule],
})
export class CronjobModule {}
