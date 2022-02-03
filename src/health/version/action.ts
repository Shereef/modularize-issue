import { Logger } from '@daysmart/aws-lambda-logger';

export async function Action(logger: Logger): Promise<unknown> {
    logger.debug('[Health_Version] Request', {});

    const verionInfo = {
        git: {
            shortSha: process.env.GIT_COMMIT_SHORT,
            sha: process.env.GIT_COMMIT_LONG,
            branch: process.env.GIT_BRANCH,
            dirty: process.env.GIT_IS_DIRTY,
            repo: process.env.GIT_REPOSITORY,
            tags: process.env.GIT_TAGS,
        },
        region: process.env.AMAZON_REGION,
        env: process.env.ENVIRONMENT,
        devMode: process.env.DEVMODE,
    };

    logger.debug('[Health_Version] Success', { VersionInfo: verionInfo });
    return verionInfo;
}
