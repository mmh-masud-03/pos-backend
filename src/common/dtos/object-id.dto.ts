import { IsString, Matches } from 'class-validator';

export class ObjectIdDto {
  @IsString()
  @Matches(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ObjectId format' })
  id: string;
}
