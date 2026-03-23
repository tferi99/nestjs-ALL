import { Controller, Get } from '@nestjs/common';
import { DB } from '../model/db';

@Controller('user')
export class UserController {
  @Get()
  async get() {
    return DB;
  }
}
