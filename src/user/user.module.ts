import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { USER_SERVICE } from './di.constants';
import { UserService } from './user.service';

const providers = [{
  provide: USER_SERVICE,
  useClass: UserService,
}];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController],
  providers: [...providers],
  exports: [...providers]
})
export class UserModule {}
