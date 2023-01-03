import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { SendTelegramMessageDTO } from './DTO/sendTelegramMessage.dto';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private telegramService: TelegramService) {}
  @Get('/send')
  async sendMessage(@Query() parmas: SendTelegramMessageDTO) {
    const { message, chatId } = parmas;
    try {
      await this.telegramService.sendMessage(chatId, message);
      return 'success';
    } catch (e) {
      throw new HttpException('Something went wrong', 500);
    }
  }
}
