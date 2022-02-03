import { Logger } from '@daysmart/aws-lambda-logger';

export async function Action(logger: Logger): Promise<string> {
    logger.debug('[Health_Check] Request', {});
    logger.debug('[Health_Check] Success', {});
    return 'Success';
}
