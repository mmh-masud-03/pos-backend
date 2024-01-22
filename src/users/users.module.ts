import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AtStrategy, RtStrategy } from './auth/strategies';
import { JwtModule } from '@nestjs/jwt';
import { HelperService } from './auth/helper/helper.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({}),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, AtStrategy, RtStrategy, HelperService],
})
export class UsersModule {}
