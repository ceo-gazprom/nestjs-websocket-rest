import { ApiProperty } from '@nestjs/swagger';
import { UserItem } from '../items/user.item';

export class UserResponseDto implements UserItem {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Иван',
  })
  firstName: string;

  @ApiProperty({
    example: 'Иванов',
  })
  lastName: string;

  @ApiProperty({
    example: 'Иванович',
  })
  middleName: string;

  @ApiProperty({
    example: 'ivan@example.com',
  })
  email: string;

  @ApiProperty({
    example: '+7-999-888-77-66',
  })
  mobilePhone: string;

  @ApiProperty({
    example: '2021-09-17T04:03:46.122Z',
  })
  dateCreated: Date;

  public static fromItem(item: UserItem): UserResponseDto {
    const user = new UserResponseDto();
  
    user.id = item.id;
    user.firstName = item.firstName;
    user.lastName = item.lastName;
    user.middleName = item.middleName;
    user.email = item.email;
    user.mobilePhone = item.mobilePhone;
    user.dateCreated = item.dateCreated;

    return user;
  }
}