import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HealthProvider } from './provider/health.provider';

@Injectable()
export class HealthService {
    constructor(private readonly healthProvider: HealthProvider) {}

    public async health(): Promise<string> {
        try {
            return await this.healthProvider.health();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Internal Server Error',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
                {
                    cause: error,
                    description:
                        'An error occurred while checking the health of the service.',
                },
            );
        }
    }
}
