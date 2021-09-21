import { Module, Global } from '@nestjs/common';
import { WEBSOCKET_CLIENT_SERVICE } from './di.constants';
import { WebsocketClientService } from './websocker-client.service';

const providers = [{
  provide: WEBSOCKET_CLIENT_SERVICE,
  useClass: WebsocketClientService,
}]

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class WebsocketClientModule{}