import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import { Group } from './entities';
import { NewGroupItem, UpdateGroupItem } from './items';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  public findMany(take: number, skip: number): Promise<Group[]> {
    return this.find({
      take,
      skip,
    });
  }

  public findById(id: number): Promise<Group> {
    return this.createQueryBuilder('group')
      .where('group.id = :id', { id })
      .loadRelationCountAndMap('group.usersCount', 'group.users')
      .leftJoinAndSelect("group.users", "users")
      .getOne();
  }

  public createGroup(group: NewGroupItem): Promise<Group> {
    const newGroup = this.create(group);
    return this.save(newGroup);
  }

  public async addUser(groupId: number, userId: number): Promise<void> {
    await this.updateDate(groupId);
  
    return this.createQueryBuilder()
      .relation(Group, "users")
      .of(groupId)
      .add(userId);
  }

  public async removeUser(groupId: number, userId: number): Promise<void> {
    await this.updateDate(groupId);

    return this.createQueryBuilder()
      .relation(Group, "users")
      .of(groupId)
      .remove(userId);
  }

  public updateGroup(id: number, groupData: UpdateGroupItem): Promise<UpdateResult> {
    const qb = this.createQueryBuilder('group')
      .update<Group>(Group)
      .where("id = :id", { id });

    if (groupData.name) qb.set({ name: groupData.name });
    if (groupData.comment) qb.set({ comment: groupData.comment });
    
    return qb.execute();
  }

  public deleteGroup(groupId: number): Promise<DeleteResult> {
    return this.delete(groupId);
  }

  private async updateDate(groupId:number): Promise<void> {
    const group = await this.findOne(groupId);
    group.dateUpdated = new Date();
    this.save(group);
  }
}