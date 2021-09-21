import { EntityRepository, Repository, DeleteResult, UpdateResult } from 'typeorm';
import { User } from './entities';
import { NewUserItem, UpdateUserItem } from './items';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findMany(take: number, skip: number): Promise<User[]> {
    return this.find({
      skip,
      take,
    });
  }
  public findById(id: number): Promise<User> {
    return this.findOne({
      where: { id },
    });
  }

  public createUser(user: NewUserItem): Promise<User> {
    const newUser = this.create(user);
    return this.save(newUser);
  }

  public deleteUser(userId: number): Promise<DeleteResult> {
    return this.delete(userId);
  }

  public updateUser(id: number, userData: UpdateUserItem): Promise<UpdateResult> {
    const qb = this.createQueryBuilder('user')
    .update<User>(User)
    .where("id = :id", { id });

    if (userData.email) qb.set({ email: userData.email });
    if (userData.mobilePhone) qb.set({ mobilePhone: userData.mobilePhone });
    if (userData.newPassword) qb.set({ password: userData.newPassword });
    
    return qb.execute();
  }
}