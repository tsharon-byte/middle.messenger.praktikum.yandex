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
            return this._instance;
        }
        this._instance = this;
        this._routes = [];
        this._default = null;
        this._selector = selector;
    }

    use(pathname: string, component: typeof Block, props: object = {}) {
        this._routes.push(new Route(pathname, component, {selector: this._selector, objectProps: props}));
        return this;
    }

    default(pathname: string, component: typeof Block, props: object = {}) {
        this._default = new Route(pathname, component, {selector: this._selector, objectProps: props});
        return this;
    }

    start() {
        onpopstate = (event) => {
            event.preventDefault();
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {

        let route = this._routes.find(route => route.match(pathname));
        if (!route) {
            if (null !== this._default) {
                route = this._default;
            } else {
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
        console.log('pathname', pathname);
        history.pushState({}, '', pathname);
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
