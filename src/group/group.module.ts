import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';
import { WebsocketClientModule } from '../clients/websocket';
import { GroupRepository } from './group.repository';
import { GroupController } from './group.controller';
import { GROUP_SERVICE } from './di.constants';
import { GroupService } from './group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository]),
    UserModule,
    WebsocketClientModule,
  ],
  controllers: [GroupController],
  providers: [{
    provide: GROUP_SERVICE,
    useClass: GroupService,
  }],
})
export class GroupModule {}