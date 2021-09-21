import { GroupItem } from './group.item';
import { UserItem } from '../../user';

export interface GroupUserItem extends GroupItem {
  usersCount: number;
  users: UserItem[];
}