import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  AfterLoad,
} from 'typeorm';
import { User } from '../../user';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  comment: string;

  @CreateDateColumn({ 
    name: 'date_created',
    type: 'timestamp with time zone',
  })
  dateCreated: Date;

  @CreateDateColumn({ 
    name: 'date_updated',
    type: 'timestamp with time zone',
  })
  dateUpdated: Date;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  usersCount: number;
}