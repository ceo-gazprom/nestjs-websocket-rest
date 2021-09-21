import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongPassword extends HttpException {
  constructor() {
    super('Wrong password', HttpStatus.FORBIDDEN);
  }
}