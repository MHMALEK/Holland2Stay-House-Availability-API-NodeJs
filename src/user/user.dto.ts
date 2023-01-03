import { IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  telegramId: string;
  @IsOptional()
  @IsEmail()
  email: string;
}
