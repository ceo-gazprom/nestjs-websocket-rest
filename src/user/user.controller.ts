import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete
} from '@nestjs/common';

@Controller('user/v1')
export class UserController {
  constructor (

  ) {}

  @Get('list')
  async getUserList() {

  }

}