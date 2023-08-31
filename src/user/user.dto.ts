import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  password: string;
  @Expose()
  avatar: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;

  @Transform(({ obj }) => obj.firstName + ' ' + obj.lastName)
  @Expose()
  fullName: string;
  @Expose()
  role: string;
  @Expose()
  isActive: boolean;

  created_at: Date;
}
