import {
  IsString,
  Length,
  IsOptional
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(3, 30)
  comment?: string;
}