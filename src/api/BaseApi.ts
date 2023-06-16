import HTTPTransport from '../utils/HTTPTransport';
import {convertKeysToCamelCase} from '../utils/keysConverter';

const defaultHeaders = {
    'Content-type': 'application/json',
    'accept': 'application/json',
};

const defaultBaseUrl = 'https://ya-praktikum.tech/api/v2';


export function getOptions(data: any = undefined) {
    const options = {
        withCredentials: true,
    };
    if (data) {
        options['data'] = JSON.stringify(data);
    }
    return options;
}

class BaseAPI {
    private _http: HTTPTransport;
    private readonly _baseUrl: string;
    private readonly _path: string;
    private readonly _headers: { 'Content-type': string };

    constructor(config) {
        this._http = new HTTPTransport();
        this._baseUrl = config.baseUrl || defaultBaseUrl;
        this._path = config.path || '';
        this._headers = config.headers || defaultHeaders;
    }

    getPath() {
        return `${this._baseUrl}${this._path}`;
    }

    private handleOptions(newOptions?: Record<any, any>) {
        const options = newOptions || {};
        options.headers = newOptions?.headers || this._headers;
        return options;
    }

    private handleResponse(res: XMLHttpRequest) {
        if (res.response === 'OK') {
            return {ok: true};
        }

        const response = JSON.parse(res.response);

        if (response && Array.isArray(response)) {
            return response.map((item) => convertKeysToCamelCase(item));
        }

        if (response && typeof response === 'object') {
            return convertKeysToCamelCase(response);
        }

        return response;
    }

    post(endpoint, options) {
        return this._http.post(this.getPath() + endpoint, this.handleOptions(options))
            .then(this.handleResponse);
    }

    get(endpoint, options) {
        return this._http.get(this.getPath() + endpoint, this.handleOptions(options))
            .then(this.handleResponse);
    }

    put(endpoint, options) {
        return this._http.put(this.getPath() + endpoint, this.handleOptions(options))
            .then(this.handleResponse);
    }

    delete(endpoint, options) {
        return this._http.delete(this.getPath() + endpoint, this.handleOptions(options))
            .then(this.handleResponse);
    }
}

export default BaseAPI;
