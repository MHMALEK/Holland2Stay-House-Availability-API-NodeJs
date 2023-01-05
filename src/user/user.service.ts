import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createNewUser(createUserDto: CreateUserDto) {
    const existingUser = await this.checkIfUserAlreadyExist(createUserDto);

    if (existingUser) {
      const updatedUser = await this.updateUser(createUserDto);
      return updatedUser;
    }

    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }
  async findUserByTelegramOrEmail({ email, telegramId }) {
    const user = await this.userModel.findOne({
      $or: [{ email }, { telegramId }],
    });
    return user;
  }

  async findUserById(userId: string) {
    const user = await this.userModel.findOne({ id: userId });
    return user;
  }

  async updateUser({ email, telegramId }) {
    const user = await this.userModel.findOneAndUpdate(
      {
        $or: [{ email }, { telegramId }],
      },
      {
        email,
        telegramId,
      },
    );
    return user;
  }

  async removeUser({ email, telegramId }) {
    const user = await this.userModel.findOneAndRemove({
      $or: [{ email }, { telegramId }],
    });
    return user;
  }

  async checkIfUserAlreadyExist({ telegramId, email }) {
    const user = await this.findUserByTelegramOrEmail({ telegramId, email });
    if (user) {
      return true;
    }
    return false;
  }
  async getUsersList() {
    const users = await this.userModel.find();
  }
}
