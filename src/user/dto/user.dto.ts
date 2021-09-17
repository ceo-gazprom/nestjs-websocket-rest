import {
  IsString,
  Length,
  IsEmail,
  IsMobilePhone
} from 'class-validator';
import { Transform } from 'class-transformer';
import * as bcrypt from 'bcrypt';

const hashPass = user => {
  return bcrypt.hashSync(user.password, 7);
}
  
export class UserDto {
  @IsString()
  @Length(3, 30)
  firstName: string;

  @IsString()
  @Length(3, 30)
  lastName: string;

  @IsString()
  @Length(3, 30)
  middleName: string;

  @IsEmail()
  @Length(3, 30)
  email: string;

  @IsMobilePhone()
  mobilePhone: string;

  @IsString()
  @Length(6, 32)
  @Transform(hashPass, { toClassOnly: true })
  password: string;
}