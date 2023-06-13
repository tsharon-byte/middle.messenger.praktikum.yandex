type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};
type RequestOptions = {
    method: string,
    headers?: Record<any, any>,
    data?: any,
    withCredentials?: boolean,
    timeout?: number
}
type Options = {
    headers?: Record<any, any>,
    data?: any,
    withCredentials?: boolean,
    timeout?: number
}

function queryStringify(data) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    get: HTTPMethod = (url, options = {
        timeout: 0
    }) => {
        const {data} = options;
        return this.request(data ? `${url}${queryStringify(data)}` : url, {
            ...options,
            method: METHODS.GET
        }, options.timeout);
    };

    post: HTTPMethod = (url, options = {
        timeout: 0
    }) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put: HTTPMethod = (url, options = {
        timeout: 0
    }) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete: HTTPMethod = (url, options = {
        timeout: 0
    }) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: RequestOptions, timeout = 5000) => {
        const {
            method,
            headers = {},
            data,
            withCredentials = false,
        } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(method, url);

            if (withCredentials) {
                xhr.withCredentials = true;
            }

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

export default HTTPTransport;
