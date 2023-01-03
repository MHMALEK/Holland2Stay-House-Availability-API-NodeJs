import { Module } from '@nestjs/common';
import { Holland2stayService } from './holland2stay.service';
import { Holland2stayController } from './holland2stay.controller';
import { CrawlerService } from 'src/crawler/crawler.service';

@Module({
  providers: [Holland2stayService, CrawlerService],
  controllers: [Holland2stayController],
})
export class Holland2stayModule {}
