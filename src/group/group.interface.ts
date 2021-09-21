import { GroupItem, NewGroupItem, GroupUserItem, UpdateGroupItem } from './items';
export interface IGroupService {
  getList(page: number): Promise<GroupItem[]>;
  getById(id: number): Promise<GroupUserItem>;
  create(groupData: NewGroupItem): Promise<GroupItem>;
  addUser(groupId: number, userId: number): Promise<void>;
  removeUser(groupId: number, userId: number): Promise<void>;
  update(id:number, groupDdata: UpdateGroupItem): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}