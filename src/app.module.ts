import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerModule } from './crawler/crawler.module';
import { CrawlerService } from './crawler/crawler.service';
import { Holland2stayModule } from './holland2stay/holland2stay.module';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from './notification/notification.module';
import * as dotenv from 'dotenv';
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
  ],
  controllers: [AppController],
  providers: [AppService, CrawlerService],
})
export class AppModule {}
