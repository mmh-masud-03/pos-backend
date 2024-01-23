import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from 'src/users/dto/auth/token.dto';

@Injectable()
export class HelperService {
  constructor(private readonly jwtService: JwtService) {}

  async getTokens(tokenDto: TokenDto) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(tokenDto, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET',
        expiresIn: 60 * 60,
      }),
      this.jwtService.signAsync(tokenDto, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET',
        expiresIn: 7 * 24 * 60 * 60,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
