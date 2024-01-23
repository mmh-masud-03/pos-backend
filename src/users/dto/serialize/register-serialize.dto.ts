import { Expose } from 'class-transformer';

export class RegisterSerializeDto {
  @Expose()
  readonly name: string;

  @Expose()
  readonly phone: string;

  @Expose()
  readonly role: string;
}
