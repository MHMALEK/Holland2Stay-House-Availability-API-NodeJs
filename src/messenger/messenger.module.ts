import { Module } from '@nestjs/common';
import { TelegramModule } from 'src/telegram/telegram.module';
import { TelegramService } from 'src/telegram/telegram.service';
import { MessengerController } from './messenger.controller';
import { MessengerService } from './messenger.service';

@Module({
  controllers: [MessengerController],
  providers: [MessengerService, TelegramService],
  imports: [TelegramModule],
})
export class MessengerModule {}
