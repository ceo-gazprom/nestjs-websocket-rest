import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IGroupService } from './group.interface';
import { GroupRepository } from './group.repository';
import { GroupItem, GroupUserItem, NewGroupItem, UpdateGroupItem } from './items';

@Injectable()
export class GroupService implements IGroupService {
  private readonly groupListSize = 10;

  constructor (
    @InjectRepository(GroupRepository) private readonly groupRepository: GroupRepository,
  ) {}

  public getList(page: number): Promise<GroupItem[]> {
    const offset = page > 0 ? page * this.groupListSize - this.groupListSize : 0;

    return this.groupRepository.findMany(this.groupListSize, offset);
  }

  public getById(id: number): Promise<GroupUserItem> {
    return this.groupRepository.findById(id);
  }

  public create(groupData: NewGroupItem): Promise<GroupItem> {
    return this.groupRepository.createGroup(groupData);
  }

  public addUser(groupId: number, userId: number): Promise<void> {
    return this.groupRepository.addUser(groupId, userId);
  }  
  
  public removeUser(groupId: number, userId: number): Promise<void> {
    return this.groupRepository.removeUser(groupId, userId);
  }

  public async update(id: number, groupData: UpdateGroupItem): Promise<boolean> {
    const result = await this.groupRepository.updateGroup(id, groupData);
    return result.affected == 0 ? false : true;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.groupRepository.deleteGroup(id);
    return result.affected == 0 ? false : true;
  }
}