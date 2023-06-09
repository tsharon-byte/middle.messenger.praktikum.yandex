import Events from '../Events';
import EventBus from '../EventBus';

class Block<Props extends Record<string, any> = unknown> {
    protected props: Props;
    private readonly _eventBus: EventBus;
    private _el: HTMLElement;
    private readonly _tag: string;
    private _components: Props[];
    protected propsAndComponents: Props;

    constructor(tag = 'div', propsAndComponents: any = {}) {
        this._tag = tag;
        const {props, components} = this.extractPropsAndComponents(propsAndComponents);
        this.props = props;
        this.propsAndComponents = propsAndComponents;
        this._components = components;
        this._eventBus = new EventBus();
        this._addEventListeners = this._addEventListeners.bind(this);
        this._init = this._init.bind(this);
        this._componentDidMount = this._componentDidMount.bind(this);
        this._componentDidUpdate = this._componentDidUpdate.bind(this);
        this.setProps = this.setProps.bind(this);
        this._render = this._render.bind(this);
        this.render = this.render.bind(this);
        this.getElement = this.getElement.bind(this);
        this._createResource = this._createResource.bind(this);
        this._addEvents = this._addEvents.bind(this);
        this._removeEvents = this._removeEvents.bind(this);
        this.compile = this.compile.bind(this);
        this._addEventListeners();
        this._eventBus.emit(Events.INIT, {});
        this.addAttribute(props);
    }

    addAttribute(props: Props): void {
        const {attrs = {}} = props;
        Object.keys(attrs).forEach(key => {
            this._el.setAttribute(key, attrs[key]);
        });
    }

    addAttributes(attrs: Record<string, any> = {}): void {
        Object.keys(attrs).forEach(key => {
            this._el.setAttribute(key, attrs[key]);
        });
        this._eventBus.emit(Events.RENDER, {});
    }

    removeAttributes(attrs = []): void {
        attrs.forEach(key => {
            this._el.removeAttribute(key);
        });
        this._eventBus.emit(Events.RENDER, {});
    }

    extractPropsAndComponents(propsAndComponents: Props[]): { props: Props, components: Props[] } {
        const props: Props = {} as Props;
        const components: Props[] = [];
        Object.keys(propsAndComponents).forEach(key => {
            if (propsAndComponents[key] instanceof Block) {
                components.push({[key]: propsAndComponents[key]});
            } else {
                props[key] = propsAndComponents[key];
            }
        });
        return {props, components};
    }

    _init(): void {
        this._createResource();
        this._eventBus.emit(Events.RENDER, this.props);
    }

    _createResource(): void {
        this._el = document.createElement(this._tag);
    }

    _addEventListeners(): void {
        this._eventBus.on(Events.INIT, this._init);
        this._eventBus.on(Events.CDM, this._componentDidMount);
        this._eventBus.on(Events.CDU, this._componentDidUpdate);
        this._eventBus.on(Events.RENDER, this._render);
    }

    _componentDidMount(): void {
        this.componentDidMount();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    componentDidMount(): void {
    }

    dispatchComponentDidMount(): void {
        this._eventBus.emit(Events.CDM, {});
    }

    _componentDidUpdate() {
        this._eventBus.emit(Events.RENDER, {});
    }

    _render(): void {
        this._removeEvents();

        const fragment = this.render();
        this._el.innerHTML = '';
        this._el.append(fragment);

        this._addEvents();
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    compile(template: string) {
        const element = document.createElement('template');
        element.innerHTML = template;
        this._components.forEach(item => {
            const key = Object.keys(item)[0];
            const stub = element.content.querySelector('#' + key);
            if (stub) {
                stub.replaceWith(item[key].getElement());
            }
            item[key].dispatchComponentDidMount();
        });
        return element.content;
    }

    getElement(): HTMLElement | undefined {
        return this._el;
    }

    setComponents(components: Props[]) {
        this._components = components;
    }

    setProps(newProps: object) {
        if (JSON.stringify(newProps) !== JSON.stringify(this.props)) {
            Object.assign(this.props, newProps);
            this._eventBus.emit(Events.CDU, {});
        }
    }

    _removeEvents(): void {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this._el.removeEventListener(eventName, events[eventName]);
        });
    }

    _addEvents(): void {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this._el.addEventListener(eventName, events[eventName]);
        });
    }

    show(): void {
        console.log('show');
    }

    hide(): void {
        console.log('hide');
    }
}

export default Block;
