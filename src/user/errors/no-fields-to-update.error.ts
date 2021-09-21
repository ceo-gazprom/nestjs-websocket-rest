import { HttpException, HttpStatus } from '@nestjs/common';

export class NoFieldsToUpdate extends HttpException {
  constructor(userId: number) {
    super(`No fields to update for user ${userId}`, HttpStatus.NOT_FOUND);
  }
}