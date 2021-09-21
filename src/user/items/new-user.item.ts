import { UserItem } from './user.item';

export type NewUserItem = Omit<UserItem, 'id' | 'dateCreated'>;