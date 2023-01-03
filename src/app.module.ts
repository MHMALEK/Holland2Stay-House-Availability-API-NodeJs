import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerModule } from './crawler/crawler.module';
import { CrawlerService } from './crawler/crawler.service';
import { Holland2stayModule } from './holland2stay/holland2stay.module';

@Module({
  imports: [CrawlerModule, Holland2stayModule],
  controllers: [AppController],
  providers: [AppService, CrawlerService],
})
export class AppModule {}
