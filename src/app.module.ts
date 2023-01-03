import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerModule } from './crawler/crawler.module';
import { CrawlerService } from './crawler/crawler.service';
import { Holland2stayModule } from './holland2stay/holland2stay.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from './notification/notification.module';
import { CronjobModule } from './cronjob/cronjob.module';
import { MessengerModule } from './messenger/messenger.module';
import * as dotenv from 'dotenv';
import { MailModule } from './mail/mail.module';
import { TelegramModule } from './telegram/telegram.module';

import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';

dotenv.config();

@Module({
  imports: [
    CrawlerModule,
    Holland2stayModule,
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@cluster0.ko1lije.mongodb.net/?retryWrites=true&w=majority`,
      {
        dbName: 'house-finder',
      },
    ),
    NotificationModule,
    CronjobModule,
    MessengerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MailModule,
    TelegramModule,
    HttpModule,
    MailerModule.forRoot({
      defaults: {
        from: process.env.MAIL_SMPT_USER,
      },
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.MAIL_SMPT_USER,
          pass: process.env.MAIL_SMPT_PASSWORD,
        },
      },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, CrawlerService],
})
export class AppModule {}
