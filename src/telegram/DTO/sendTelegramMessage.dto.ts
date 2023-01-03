import { IsNotEmpty } from 'class-validator';

export class SendTelegramMessageDTO {
  @IsNotEmpty()
  chatId: string;

  @IsNotEmpty()
  message: string;
}
