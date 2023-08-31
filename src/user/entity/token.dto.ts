import { Expose } from 'class-transformer';

export class TokenUserDto {
  @Expose()
  id: number;
  @Expose()
  accessToken: string;
  @Expose()
  refreshToken: string;
  @Expose()
  created_at: Date;
}
