import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { USER_SERVICE } from './di.constants';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    }
  ],
})
export class UserModule {}