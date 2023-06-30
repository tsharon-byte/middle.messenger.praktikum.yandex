import {assert, expect} from 'chai';
import {JSDOM} from 'jsdom';
import BaseAPI from './BaseApi';
import sinon from 'sinon';

const dom = new JSDOM('<div id="root"><div>', {url: 'http://localhost'});

global.window = dom.window;
global.document = dom.window.document;
describe('Тест для BaseApi', () => {
    let requests;

    function createEntity() {
        return new BaseAPI({path: '/auth'});
    }

    before(function () {
        global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        requests = [];
        global.XMLHttpRequest.onCreate = function (req) {
            requests.push(req);
        };
    });

    after(function () {
        // Like before we must clean up when tampering with globals.
        global.XMLHttpRequest.restore();
    });

    it('первый тест', () => {
        const api = createEntity();
        api.post('/logout', {
            withCredentials: true
        });
        assert.equal(requests.length, 1);
        expect(requests[0].url, '/auth/logout');
    });
});
