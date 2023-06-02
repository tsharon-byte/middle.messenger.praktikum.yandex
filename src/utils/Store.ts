import EventBus from './EventBus';
import set from './set';

export const UPDATED = 'updated';
type StateType = {
    user: UserDataType | NonNullable<unknown>
}

class Store extends EventBus {
    constructor() {
        super();
        console.log('Store constructor');
    }

    private state = {
        user: JSON.parse(<string>localStorage.getItem('user')) || {}
    };

    getState(): StateType {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        localStorage.setItem('user', JSON.stringify(value));

        // метод EventBus
        this.emit(UPDATED);
    }

}

export default new Store();
