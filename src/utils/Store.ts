import EventBus from './EventBus';
import set from './set';
import {ADD_CHAT_MODAL_NAME} from '../config/constant';

export const UPDATED = 'updated';
type StateType = {
    chats?: [];
    user: UserDataType | NonNullable<unknown>,
    [ADD_CHAT_MODAL_NAME]: boolean
}

class Store extends EventBus {
    constructor() {
        super();
        console.log('Store constructor');
    }

    private state = {
        user: JSON.parse(<string>localStorage.getItem('user')) || {},
        [ADD_CHAT_MODAL_NAME]: JSON.parse(<string>localStorage.getItem(ADD_CHAT_MODAL_NAME)) || false
    };

    getState(): StateType {
        return this.state;
    }

    public set(path: string, value: unknown) {
        console.log('set', path, value);
        set(this.state, path, value);
        localStorage.setItem(path, JSON.stringify(value));

        // метод EventBus
        this.emit(UPDATED);
    }

}

export default new Store();
