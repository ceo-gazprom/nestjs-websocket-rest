import { Injectable, Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { IWebsocketClientService } from './websocket-client-service.interface';
import { IMessage } from './message.interfase';


@Injectable()
@WebSocketGateway()
export class WebsocketClientService implements IWebsocketClientService, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() public server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  public sendMessage<T>(msg: IMessage<T>): void {
    this.server.emit('msgToClient', msg);
    this.logger.log('Sended message via websocket!')
  }

  public afterInit(server: Server): void {
    this.logger.log('Init websoket');
  }

  public handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log(`Client connected: ${client.id}`);
  }
}