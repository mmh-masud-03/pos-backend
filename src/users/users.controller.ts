import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateUserDto,
  ForgotPasswordDto,
  RegisterSerializeDto,
  ResetPasswordDto,
  UpdateUserDto,
  UserLoginDto,
  loginSerializeDto,
} from './dto';
import { UsersService } from './users.service';
import { AuthService } from './auth/auth.service';
import { SerializeInterceptor } from 'src/common/interceptors/serialize.interceptor';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseInterceptors(new SerializeInterceptor(RegisterSerializeDto))
  @Post('auth/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @UseInterceptors(new SerializeInterceptor(loginSerializeDto))
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.authService.login(userLoginDto);
  }

  @Post('auth/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body() phone: string) {
    return await this.authService.logout(phone);
  }

  @Post('auth/reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Post('auth/forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Get()
  async findAll(@Query() userQuery: UserQuery) {
    return await this.usersService.findAll(userQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
