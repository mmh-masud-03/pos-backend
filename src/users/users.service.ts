import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(userQuery: UserQuery) {
    let query = this.userModel.find({ role: { $ne: 'admin' } });

    // Apply pagination
    if (userQuery.page && userQuery.limit) {
      query = query
        .skip((userQuery.page - 1) * userQuery.limit)
        .limit(userQuery.limit);
    }

    const users = await query.exec();

    if (!users.length) {
      throw new NotFoundException('There is no user !');
    }

    return users;
  }

  async findByPhone(phone: string) {
    return await this.userModel.find({ phone }).exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found !');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found !');
    }

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();

    if (!user) {
      throw new NotFoundException('User not found !');
    }

    return user;
  }
}
