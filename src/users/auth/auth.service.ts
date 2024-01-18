import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import {
  CreateUserDto,
  ResetPasswordDto,
  UserLoginDto,
  ForgotPasswordDto,
} from '../dto';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly usersService: UsersService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByPhone(createUserDto.phone);

    if (user.length) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(userLoginDto: UserLoginDto) {
    const [user] = await this.usersService.findByPhone(userLoginDto.phone);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const [user] = await this.usersService.findByPhone(resetPasswordDto.phone);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      resetPasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);

    const updatedUser = await this.usersService.update(user._id, {
      password: hashedPassword,
    });

    return updatedUser;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const [user] = await this.usersService.findByPhone(forgotPasswordDto.phone);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isOTPValid = true;

    if (!isOTPValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const hashedPassword = await bcrypt.hash(forgotPasswordDto.password, 10);

    const updatedUser = await this.usersService.update(user._id, {
      password: hashedPassword,
    });

    return updatedUser;
  }
}
