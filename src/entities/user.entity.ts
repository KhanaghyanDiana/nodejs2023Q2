import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users_Crud {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column({ nullable: true })
  login?: string;
  @Column({ nullable: true })
  password: string;
  @PrimaryGeneratedColumn()
  version?: number;
  @CreateDateColumn()
  createdAt?: number;
  @UpdateDateColumn()
  updatedAt?: number;
}
