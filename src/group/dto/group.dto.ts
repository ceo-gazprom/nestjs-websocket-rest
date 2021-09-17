import {IsString, Length} from 'class-validator';

export class GroupDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsString()
  @Length(3, 30)
  comment: string;
}