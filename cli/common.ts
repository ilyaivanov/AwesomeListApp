export const decode = (response: string, encoding: string) => new Buffer(response, encoding).toString('utf8');

export const stringify = (obj: any) => JSON.stringify(obj, null, 2);
