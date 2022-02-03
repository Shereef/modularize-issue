export function formatEventBody(body: string|unknown) {
    if (typeof body === 'string') {
        return JSON.parse(body);
    } else {
        return body;
    }
}
