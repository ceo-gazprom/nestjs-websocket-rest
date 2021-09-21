import { ApiProperty } from '@nestjs/swagger';
import { GroupResponseDto } from './group-response.dto';
import { GroupUserItem } from '../items';
import { UserResponseDto } from '../../user';

export class GroupUserResponseDto extends GroupResponseDto {
  @ApiProperty()
  usersCount: number;

  @ApiProperty({
    type: [UserResponseDto],
  })
  users: UserResponseDto[];

  public static fromItem(item: GroupUserItem): GroupUserResponseDto {
    const groupResponse = new GroupUserResponseDto();
    groupResponse.id = item.id;
    groupResponse.name = item.name;
    groupResponse.comment = item.comment;
    groupResponse.dateUpdated = item.dateUpdated;
    groupResponse.usersCount = item.usersCount;
    groupResponse.users = item.users.length > 0 ? item.users.map(user => UserResponseDto.fromItem(user)) : [];

    return groupResponse;
  }
}