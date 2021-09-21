import { ApiProperty } from '@nestjs/swagger';
import { GroupItem } from '../items';

export class GroupResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  dateCreated: Date;

  @ApiProperty()
  dateUpdated: Date;

  public static fromItem(item: GroupItem): GroupResponseDto {
    const groupResponse = new GroupResponseDto();

    groupResponse.id = item.id;
    groupResponse.name = item.name;
    groupResponse.comment = item.comment;
    groupResponse.dateCreated = item.dateCreated;
    groupResponse.dateUpdated = item.dateUpdated;

    return groupResponse;
  }
}