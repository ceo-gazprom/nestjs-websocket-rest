import {
  Controller,
  Inject,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { GROUP_SERVICE } from './di.constants';
import { IGroupService } from './group.interface';
import { USER_SERVICE, IUserService, UserIsNotFound } from '../user';
import {
  WEBSOCKET_CLIENT_SERVICE,
  IWebsocketClientService,
  IMessage,
} from '../clients/websocket';
import {
  PaginationQueryDto,
  GroupDto,
  GroupResponseDto,
  GroupUserResponseDto,
  UpdateGroupDto,
} from './dto';
import { GroupIsNotFound } from './errors';

@Controller('group/v1')
@ApiTags('Group')
export class GroupController {
  constructor(
    @Inject(GROUP_SERVICE) private readonly groupService: IGroupService,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    @Inject(WEBSOCKET_CLIENT_SERVICE) private readonly websocketClient: IWebsocketClientService,
  ) {}

  @Get('list')
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: GroupResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async getGroupList(@Query() paginationQury: PaginationQueryDto): Promise<GroupDto[]> {
    const result = await this.groupService.getList(paginationQury.page);
    return result.map(group => GroupResponseDto.fromItem(group));
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [GroupUserResponseDto],
  })
  @HttpCode(HttpStatus.OK)
  async getGroupById(@Param('id') id: number): Promise<GroupUserResponseDto> {
    const result = await this.groupService.getById(id);
    if (!result) throw new GroupIsNotFound(id);

    return GroupUserResponseDto.fromItem(result);
  }

  @Post('create')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [GroupUserResponseDto],
  })
  @HttpCode(HttpStatus.OK)
  async createGroup(@Body() groupData: GroupDto): Promise<GroupResponseDto> {
    const result = await this.groupService.create(groupData);
    this.websocketClient.sendMessage<GroupResponseDto>({
      entity: 'group',
      event: 'create',
      id: result.id,
      payload: result,
    })
    return GroupResponseDto.fromItem(result);
  }

  @Post(':id/add-user/:userId')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [GroupUserResponseDto],
  })
  @HttpCode(HttpStatus.OK)
  async addUser(
    @Param('id') groupId: number,
    @Param('userId') userId: number,
  ): Promise<GroupUserResponseDto> {
    const userExist = await this.userService.getById(userId);
    if (!userExist) throw new UserIsNotFound(userId);

    const groupExist = await this.groupService.getById(groupId);
    if (!groupExist) throw new GroupIsNotFound(groupId);

    await this.groupService.addUser(groupId, userId);

    const result = await this.groupService.getById(groupId);
    this.websocketClient.sendMessage<GroupUserResponseDto>({
      entity: 'group',
      event: 'addUser',
      id: result.id,
      payload: result,
    })
    return GroupUserResponseDto.fromItem(result)
  }

  @Post(':id/remove-user/:userId')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [GroupUserResponseDto],
  })
  @HttpCode(HttpStatus.OK)
  async removeUser(
    @Param('id') groupId: number,
    @Param('userId') userId: number,
  ): Promise<GroupUserResponseDto> {
    const userExist = await this.userService.getById(userId);
    if (!userExist) throw new UserIsNotFound(userId);

    const groupExist = await this.groupService.getById(groupId);
    if (!groupExist) throw new GroupIsNotFound(groupId);

    await this.groupService.removeUser(groupId, userId);

    const result = await this.groupService.getById(groupId);
    this.websocketClient.sendMessage<GroupUserResponseDto>({
      entity: 'group',
      event: 'removeUser',
      id: result.id,
      payload: result,
    })
    return GroupUserResponseDto.fromItem(result)
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [GroupUserResponseDto],
  })
  @HttpCode(HttpStatus.OK)
  async updateGroup(@Param('id') id: number, @Body() groupData: UpdateGroupDto): Promise<GroupUserResponseDto> {
    const groupExist = await this.groupService.getById(id);
    if (!groupExist) throw new GroupIsNotFound(id);

    const result = await this.groupService.update(id, groupData);
    if (result) {
      const group = await this.groupService.getById(id);
      this.websocketClient.sendMessage<GroupUserResponseDto>({
        entity: 'group',
        event: 'updateGroup',
        id: group.id,
        payload: group,
      })
      return GroupUserResponseDto.fromItem(group);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  async deleteGroup(@Param('id') id: number): Promise<any> {
    const result = await this.groupService.delete(id);

    if (!result) throw new GroupIsNotFound(id);
    this.websocketClient.sendMessage<any>({
      entity: 'group',
      event: 'deleteGroup',
      id: id,
      payload: '',
    })
  }
}