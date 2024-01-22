import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenDto } from 'src/users/dto/auth/token.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelperService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(tokenDto: TokenDto) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(tokenDto, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
        expiresIn: 15 * 60,
      }),
      this.jwtService.signAsync(tokenDto, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret',
        expiresIn: 7 * 24 * 60 * 60,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRefreshToken(phone: string, rt: string) {
    const hashedRt = await bcrypt.hash(rt, 10);
    await this.userModel.findOneAndUpdate(
      { phone },
      { refresh_token: hashedRt },
    );
  }
}
