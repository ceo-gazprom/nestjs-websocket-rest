import {
  IsString,
  Length,
  IsEmail,
  IsMobilePhone
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

/** 
 * Fn create hash from password
 */
const hashPass = pass => {
  return bcrypt.hashSync(pass.value, 7);
}
  
export class UserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  firstName: string;

  @ApiProperty()
  @IsString()
  @Length(3, 30)
  lastName: string;

  @ApiProperty()
  @IsString()
  @Length(3, 30)
  middleName: string;

  @ApiProperty()
  @IsEmail()
  @Length(3, 30)
  email: string;

  @ApiProperty()
  @IsMobilePhone()
  mobilePhone: string;

  @ApiProperty()
  @IsString()
  @Length(6)
  @Transform(hashPass, {toClassOnly: true})
  password: string;
}