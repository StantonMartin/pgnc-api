import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { HealthProvider } from './provider/health.provider';

@Module({
    controllers: [HealthController],
    providers: [HealthService, HealthProvider],
})
export class HealthModule {}
