import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { Role } from 'src/auth/decorator/role.decorator';
import { roleTypes } from 'src/auth/enum/role-types.enum';

@Controller('health')
@ApiTags('Health')
export class HealthController {
    public constructor(private readonly healthService: HealthService) {}

    @Get()
    @ApiOperation({
        summary: 'Check the health of the API',
    })
    @ApiResponse({
        status: 200,
        description: 'API is healthy',
    })
    @Role(roleTypes.NA)
    public checkHealth(): Promise<string> {
        return this.healthService.health();
    }
}
