import { IMessage } from './message.interfase';

export interface IWebsocketClientService {
  sendMessage<T>(msg: IMessage<T>): void;
}