import EventBus from './EventBus';
import set from './set';
import {ADD_CHAT_MODAL_NAME, ADD_USER_MODAL_NAME, CURRENT_CHAT_NAME, REMOVE_USER_MODAL_NAME} from '../config/constant';

export const UPDATED = 'updated';
type StateType = {
    chats?: ChatType[];
    user: UserType | NonNullable<unknown>,
    [ADD_CHAT_MODAL_NAME]: boolean,
    [ADD_USER_MODAL_NAME]: boolean,
    [REMOVE_USER_MODAL_NAME]: boolean,
    [CURRENT_CHAT_NAME]: number|undefined
}

class Store extends EventBus {
    private state: StateType;

    constructor() {
        super();
        console.log('Store constructor');
        this.state = {
            user: JSON.parse(<string>localStorage.getItem('user')) || {},
            [ADD_CHAT_MODAL_NAME]: JSON.parse(<string>localStorage.getItem(ADD_CHAT_MODAL_NAME)) || false,
            [ADD_USER_MODAL_NAME]: JSON.parse(<string>localStorage.getItem(ADD_USER_MODAL_NAME)) || false,
            [REMOVE_USER_MODAL_NAME]: JSON.parse(<string>localStorage.getItem(REMOVE_USER_MODAL_NAME)) || false,
            chats: [],
            [CURRENT_CHAT_NAME]: JSON.parse(<string>localStorage.getItem(CURRENT_CHAT_NAME))
        };
    }


    getState(): StateType {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        localStorage.setItem(path, JSON.stringify(value));

        // метод EventBus
        this.emit(UPDATED);
    }

}

export default new Store();
