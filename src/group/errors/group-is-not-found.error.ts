import { HttpException, HttpStatus } from '@nestjs/common';

export class GroupIsNotFound extends HttpException {
  constructor(groupId: number) {
    super(`Group with id ${groupId} is not found`, HttpStatus.NOT_FOUND);
  }
}