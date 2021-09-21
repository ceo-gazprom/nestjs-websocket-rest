import {
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { USER_SERVICE } from './di.constants';
import { IUserService } from './user-service.interface';
import { UserDto, UserResponseDto, UpdateUserDto, PaginationQueryDto } from './dto';
import { UserIsNotFound, WrongPassword, NoFieldsToUpdate } from './errors';

@Controller('user/v1')
@ApiTags('User')
export class UserController {
  constructor (
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Get('list')
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: UserResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async getUserList(@Query() PaginationQuery: PaginationQueryDto): Promise<UserResponseDto[]> {
    const result = await this.userService.getList(PaginationQuery.page);
    return result.map((user) => UserResponseDto.fromItem(user));
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number): Promise<UserResponseDto> {
    const result = await this.userService.getById(id);
    if (!result) throw new UserIsNotFound(id);
  
    return UserResponseDto.fromItem(result);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async updateUserById(@Param('id') id: number, @Body() userData: UpdateUserDto): Promise<UserResponseDto> {
    if (!userData.email && !userData.newPassword && !userData.pmobilePhone) {
      throw new NoFieldsToUpdate(id);
    }

    const matched = await this.userService.checkPassword(id, userData.password);
    if (!matched) throw new WrongPassword();
  
    const result = await this.userService.update(id, userData);
    if (result) {
      const updatedUser = await this.userService.getById(id);
      return UserResponseDto.fromItem(updatedUser);
    }
  }

  @Post('create')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() userData: UserDto): Promise<UserResponseDto> {
    const result = await this.userService.create(userData);
    return UserResponseDto.fromItem(result);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  async deleteUserById(@Param('id') id: number): Promise<void> {
    const result = await this.userService.delete(id);
    if (!result) throw new UserIsNotFound(id);
  }
}