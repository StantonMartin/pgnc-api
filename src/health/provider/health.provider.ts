import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthProvider {
    public async health(): Promise<string> {
        return 'OK';
    }
}
