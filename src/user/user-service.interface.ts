import { NewUserItem, UserItem, UpdateUserItem } from './items';

export interface IUserService {
  getList(page: number): Promise<UserItem[]>;
  getById(id: number): Promise<UserItem>;
  create(userData: NewUserItem): Promise<UserItem>;
  delete(id: number): Promise<boolean>;
  update(id: number, userData: UpdateUserItem): Promise<boolean>;
  checkPassword(id: number, password: string): Promise<boolean>;
}