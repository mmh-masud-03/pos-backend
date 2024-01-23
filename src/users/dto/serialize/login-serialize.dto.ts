import { Expose } from 'class-transformer';

export class loginSerializeDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly phone: string;

  @Expose()
  readonly role: string;

  @Expose()
  readonly refreshToken: string;

  @Expose()
  readonly accessToken: string;
}
