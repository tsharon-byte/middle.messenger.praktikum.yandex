class EventBus {
    private readonly _listeners: Record<string, Array<() => void>> = {};

    constructor() {
        this._listeners = {};
    }

    on(event: string, callback: (any) => void): void {
        if (this._listeners[event] === undefined) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(callback);
    }

    off(event: string, callback: () => void): void {
        if (this._listeners[event] === undefined) {
            throw new Error('Нет события ' + event);
        }
        this._listeners[event].filter(item => item !== callback);
    }

    emit(event: string, ...args): void {
        if (this._listeners[event] === undefined) {
            throw new Error('Нет события ' + event);
        }
        this._listeners[event].forEach(item => item(...args));
    }
}

export default EventBus;
