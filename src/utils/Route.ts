import Block from './Block';

class Route {
    private readonly _pathname: string;
    private _props: { selector: string };
    private readonly _block: Block;
    private readonly _root: Element | null;

    constructor(pathname: string, view: typeof Block, props:{ selector: string, objectProps: object }) {
        console.log('constructor', props);
        this._pathname = pathname;
        this._props = props;
        this._block = new view('div', props.objectProps );
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
            console.log('render');
            this._root.appendChild(this._block.getElement());
        } else {
            console.error('error: can\'t add element to element with selector ' + this._props.selector);
        }
        this._block.show();
    }
}

export default Route;
