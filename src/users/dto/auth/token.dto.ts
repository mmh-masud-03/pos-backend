import { IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class TokenDto {
  @IsString()
  @IsPhoneNumber('BD')
  @Matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/, {
    message: 'Invalid phone number',
  })
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}
