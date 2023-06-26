import {assert, expect} from 'chai';
import {JSDOM} from 'jsdom';
import BaseAPI from './BaseApi';
import sinon from 'sinon';

const dom = new JSDOM('<div id="root"><div>', {url: 'http://localhost'});

global.window = dom.window;
global.document = dom.window.document;
describe('Тест для BaseApi', () => {
    let xhr, requests;

    function createEntity() {
        return new BaseAPI({path: '/auth'});
    }

    before(function () {
        console.log('before');
        global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        requests = [];
        global.XMLHttpRequest.onCreate = function (req) {
            console.log('xhr.onCreate');
            requests.push(req);
        };
    });

    after(function () {
        console.log('after');
        // Like before we must clean up when tampering with globals.
        global.XMLHttpRequest.restore();
    });

    it('первый тест', () => {
        const api = createEntity();
        api.post('/logout', {
            withCredentials: true
        });
        expect('1', '1');
        assert.equal(requests.length, 2);
        expect(requests[0].url, '/auth/logout');
    });
});
