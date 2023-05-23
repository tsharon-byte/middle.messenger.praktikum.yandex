import Route from './Route';
import Block from './Block';

class Router {
    private readonly _instance: Router;
    private _routes: Route[];
    private readonly _selector: string;
    private _currentRoute: Route;
    private _default: Route | null;

    constructor(selector: string) {
        if (this._instance) {
            console.log('if (this._instance)');
            return this._instance;
        }
        console.log('else this._instance');
        this._instance = this;
        console.log('else this._instance', this._instance);
        this._routes = [];
        this._default = null;
        this._selector = selector;
    }

    use(pathname: string, component: typeof Block, props:object={}) {
        this._routes.push(new Route(pathname, component, {selector: this._selector, objectProps:props}));
        return this;
    }

    default(pathname: string, component: typeof Block, props:object={}) {
        this._default = new Route(pathname, component, {selector: this._selector, objectProps:props});
        return this;
    }

    start() {
        onpopstate = (event) => {
            event.preventDefault();
            console.log('onpopstate');
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    getRoute(pathname: string) {
        return this._routes.find(route => route.match(pathname));
    }

    _onRoute(pathname: string) {
        console.log('_onRoute');
        let route = this.getRoute(pathname);
        if (!route) {
            if(null !== this._default){
                route=this._default;
            }
            else{
                return;
            }
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;

        route.render();
    }

    go(pathname: string) {
        //history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        history.go(-1);
    }

    forward() {
        history.go(1);
    }
}

export default Router;
