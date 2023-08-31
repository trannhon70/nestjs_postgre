import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class TokenUser {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @CreateDateColumn()
  created_at: Date;
}
