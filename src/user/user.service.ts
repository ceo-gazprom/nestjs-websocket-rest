import { Injectable } from '@nestjs/common';
import { IUserService } from './user-service.interface';

@Injectable()
export class UserService implements IUserService {

}