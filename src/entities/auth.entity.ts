import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({nullable:true})
  password: string | null;
  @Column()
  login: string;
}
