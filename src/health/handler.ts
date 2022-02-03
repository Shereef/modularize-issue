import { createLogger } from '@daysmart/aws-lambda-logger';
import { formatEventBody } from '../shared/functions';
import { AWSContext, AWSEvent } from '../shared/models';
import { Action as Check } from './check/action';
import { Action as Version } from './version/action';

export async function check(event: AWSEvent, context: AWSContext) {
    const logger = createLogger(
        !!event.debug || !!process.env.DEBUG,
        context.awsRequestId,
        {
            gitCommit: process.env.GIT_COMMIT_SHORT,
        }
    );
    if (event && event.arguments && event.arguments.input) {
        const parsedBody = formatEventBody(event.arguments.input);
        logger.log('healthCheck:event.arguments.input', { parsedBody });
    }
    let checkResponse: unknown;

    // forcing the lambda to end execution when callback is called due to the database connection staying open
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        checkResponse = await Check(logger);
    } catch (err: unknown) {
        logger.error('healthCheck:handler_error', err);
        if (err && err instanceof Error && err.message) {
            throw new Error(err.message);
        } else {
            throw new Error(JSON.stringify(err));
        }
    }
    return checkResponse;
}

export async function version(event: AWSEvent, context: AWSContext) {
    const logger = createLogger(
        !!event.debug || !!process.env.DEBUG,
        context.awsRequestId,
        {
            gitCommit: process.env.GIT_COMMIT_SHORT,
        }
    );
    if (event && event.arguments && event.arguments.input) {
        const parsedBody = formatEventBody(event.arguments.input);
        logger.log('healthVersion:event.arguments.input', { parsedBody });
    }
    let versionResponse: unknown;

    // forcing the lambda to end execution when callback is called due to the database connection staying open
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        versionResponse = await Version(logger);
    } catch (err: unknown) {
        logger.error('healthVersion:handler_error', err);
        if (err && err instanceof Error && err.message) {
            throw new Error(err.message);
        } else {
            throw new Error(JSON.stringify(err));
        }
    }
    return versionResponse;
}
