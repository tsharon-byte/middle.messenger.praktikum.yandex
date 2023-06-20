import {expect} from 'chai';
import Router from './Router';
import {JSDOM} from 'jsdom';

const dom = new JSDOM('<div id="root"><div>', {url: 'http://localhost'});

global.window = dom.window;
global.document = dom.window.document;

describe('Тест для роутера', () => {

    function createEntity() {
        return new Router('.content');
    }

    it('Переход на новую страницу должен менять состояние сущности history', () => {
        const router = createEntity();
        expect(window.history.length).to.eq(1);
        router.start();
        router.go('/');
        expect(window.history.length).to.eq(2);
    });
});
