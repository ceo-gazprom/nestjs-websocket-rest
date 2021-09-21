import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  IsOptional
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
export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(6)
  @Transform(hashPass, {toClassOnly: true})
  newPassword?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  pmobilePhone?: string;
}