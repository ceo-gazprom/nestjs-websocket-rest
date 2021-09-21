import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { IUserService } from './user-service.interface';
import { UserRepository } from './user.repository';
import { NewUserItem, UserItem, UpdateUserItem } from './items';


@Injectable()
export class UserService implements IUserService {
  private readonly userListSize = 10;

  constructor (
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  public getList(page: number): Promise<UserItem[]> {
    const offset = page > 0 ? page * this.userListSize - this.userListSize : 0;
    return this.userRepository.findMany(this.userListSize, offset);
  }

  public getById(id: number): Promise<UserItem> {
    return this.userRepository.findById(id);
  }

  public create(userData: NewUserItem): Promise<UserItem> {
    return this.userRepository.createUser(userData);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.deleteUser(id);
    return result.affected == 0 ? false : true;
  }

  public async checkPassword(id: number, password: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    return bcrypt.compareSync(password, user.password);
  }

  public async update(id: number, userData: UpdateUserItem): Promise<boolean> {
    const result = await this.userRepository.updateUser(id, userData);
    return result.affected == 0 ? false : true;
  }
}