import Block from './Block/Block';

class Route {
    private readonly _pathname: string;
    private _props: { selector: string };
    private readonly _block: Block;
    private readonly _root: Element | null;

    constructor(pathname: string, view: typeof Block, props: { selector: string, objectProps: object }) {
        this._pathname = pathname;
        this._props = props;
        this._block = new view('div', props.objectProps);
        this._root = document.querySelector(this._props.selector);
    }

    leave() {
        this._block.hide();
    }

    match(pathname: string) {
        return this._pathname === pathname;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._block.show();
        }
    }

    render() {
        if (this._root) {
            this._root.innerHTML = '';
            this._root.appendChild(this._block.getElement());
            this._block.dispatchComponentDidMount();
            this._block.show();
        } else {
            console.error('error: can\'t add element to element with selector ' + this._props.selector);
        }
    }
}

export default Route;
