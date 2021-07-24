import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponsePayload } from './lib/response/response.payload';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  get(): ResponsePayload {
    return new ResponsePayload(`welcome to test-sejutacita-crud-nest`)
  }
}
