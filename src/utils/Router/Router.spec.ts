import {expect} from 'chai';
import Router from './Router';
import {JSDOM} from 'jsdom';
import sinon from 'sinon';
import Block from '../Block/Block';

const dom = new JSDOM('<div id="root"><div>', {url: 'http://localhost'});

global.window = dom.window;
global.document = dom.window.document;

describe('Тест для роутера', () => {
    let BlockMock: Block;
    let getElementFake;
    let router;

    function createEntity() {
        return new Router('#root');
    }

    beforeEach(() => {
        getElementFake = sinon.stub().returns(document.createElement('div'));
        BlockMock = class {
            getElement = getElementFake;
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            dispatchComponentDidMount = () => {
            };
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            show = () => {
            };
        } as unknown as Block;
        router = createEntity();
    });

    afterEach(() => {
        sinon.restore();
    });


    it('Переход на новую страницу должен менять состояние сущности history', () => {
        expect(window.history.length).to.eq(1);
        router.start();
        router.go('/');
        expect(window.history.length).to.eq(2);
    });

    it('метод use должен вернуть инстанс роутера', () => {
        const result = router.use('/', BlockMock);
        expect(result).to.be.eq(router);
        result.start();
        expect(getElementFake.callCount).to.eql(1);
    });
});
