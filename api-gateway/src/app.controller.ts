import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class AppController {
  constructor(private readonly config: ConfigService) {}
  @Get()
  health() {
    return {
      status: 'UP',
      service: 'api-gateway-service',
      env: this.config.get('app.env'),
      time: new Date().toISOString(),
    };
  }
}

