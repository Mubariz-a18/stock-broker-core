import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class AppController {
  @Get()
  health() {
    return {
      status: 'UP',
      service: 'api-gateway-service',
      time: new Date().toISOString(),
    };
  }
}

