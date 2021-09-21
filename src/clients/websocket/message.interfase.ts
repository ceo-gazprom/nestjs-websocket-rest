export interface IMessage<T> {
  entity: string;
  event: string;
  id: number;
  payload: T;
}