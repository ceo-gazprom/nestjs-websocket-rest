import { ApiProperty } from '@nestjs/swagger';
import {IsString, Length} from 'class-validator';

export class GroupDto {
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(3, 30)
  comment: string;
}