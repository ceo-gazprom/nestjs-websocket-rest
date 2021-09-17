import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'first_name',
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'middle_name',
    nullable: false,
  })
  middleName: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    name: 'mobile_phone',
    nullable: false,
  })
  mobilePhone: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    name: 'date_created',
    nullable: false,
  })
  dateCreated: Date;
}