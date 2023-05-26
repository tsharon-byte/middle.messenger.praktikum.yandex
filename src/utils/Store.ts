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
        user: {}
    };

    getState(): StateType {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        // метод EventBus
        this.emit(UPDATED);
    }

}

export default new Store();
