import { Injectable } from '@nestjs/common';
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
    let query = this.userModel.find();

    // Apply pagination
    if (userQuery.page && userQuery.limit) {
      query = query
        .skip((userQuery.page - 1) * userQuery.limit)
        .limit(userQuery.limit);
    }

    const users = await query.exec();
    return users;
  }

  async findByPhone(phone: string) {
    return await this.userModel.find({ phone }).exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
