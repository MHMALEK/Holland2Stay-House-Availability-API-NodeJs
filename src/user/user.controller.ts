import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/add')
  async create(@Body() createUserDto: CreateUserDto) {
    const { telegramId, email } = createUserDto;
    const res = await this.userService.createNewUser({ telegramId, email });
    return res;
  }
}
