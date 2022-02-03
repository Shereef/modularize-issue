export class BaseModel<T> {
    constructor(
        params: Partial<T>,
        opts: { allowNull: boolean } = { allowNull: false }
    ) {
        for (const field of Object.keys(params)) {
            const fliedValue: unknown = (params as { [key: string]: unknown })[
                field
            ];
            if (opts.allowNull) {
                this[field] = fliedValue;
            } else {
                // Only ignore undefined and null fields
                if (fliedValue !== null || fliedValue !== undefined) {
                    this[field] = fliedValue;
                }
            }
        }
    }
    [key: string]: unknown;
}

export class AWSEventArguments extends BaseModel<AWSEventArguments> {
    input: unknown;
}

export class AWSEvent extends BaseModel<AWSEvent> {
    debug: unknown;
    arguments!: AWSEventArguments;
}

export class AWSContext extends BaseModel<AWSContext> {
    awsRequestId!: string;
    callbackWaitsForEmptyEventLoop!: boolean;
}
