import { Controller, Get, Query } from '@nestjs/common';
import { sendMailMessageDTO } from './DTO/sendMailMessage.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}
  @Get('/send')
  sendEmail(@Query() parmas: sendMailMessageDTO) {
    const { to, subject, text } = parmas;
    this.mailService.sendMessage({ to, subject, text });
  }
}
