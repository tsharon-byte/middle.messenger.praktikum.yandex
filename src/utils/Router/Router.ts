import Route from '../Route';
import Block from '../Block/Block';

class Router {
    private readonly _instance: Router;
    private _routes: Route[];
    private readonly _selector: string;
    private _currentRoute: Route;
    private _default: Route | null;
    private _onRouteCallback: () => void;
    private _unprotectedPaths: `/${string}`[];

    constructor(selector: string) {
        if (this._instance) {
            return this._instance;
        }
        this._instance = this;
        this._routes = [];
        this._default = null;
        this._selector = selector;
    }

    public setUnprotectedPaths(paths: `/${string}`[]) {
        this._unprotectedPaths = paths;
        return this;
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
        window.onpopstate = (event) => {
            event.preventDefault();
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    public onRoute(callback: () => void) {
        this._onRouteCallback = callback;
        return this;
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

        if (this._unprotectedPaths && !this._unprotectedPaths.includes(pathname as `/${string}`)) {
            this._onRouteCallback();
        }

        route.render();
    }

    go(pathname: string) {
        window.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        window.history.go(-1);
    }

    forward() {
        window.history.go(1);
    }
}

export default Router;
