import { IsNotEmpty, IsOptional } from 'class-validator';

export class sendMailMessageDTO {
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  text: string;

  @IsOptional()
  subject: string;
}
