import Block from '../../utils/Block';
import Button from '../Button/Button';
import Input from '../Input/Input';
import {handleSubmit, onInput} from '../../utils/validation';
import chatController from '../../controller/ChatController';
import store from '../../utils/Store';
import {ADD_USER_MODAL_NAME} from '../../config/constant';
import UserController from '../../controller/UserController';

const FORM_NAME = 'addUserPopupForm';
const button = new Button({className: 'button form__button', children: 'Добавить'});

const login = new Input({
    className: 'input',
    placeholder: 'Логин',
    name: 'login',
    minlength: '1',
    maxlength: '20',
    pattern: '[a-zA-Z\\-_0-9]{1,20}',
    required: true,
    events: {
        'input': (event) => onInput(event, 'login', button, FORM_NAME)
    }
});

function handleSubmitCallback(data) {
    const login = data.login;
    const chatId = store.getState().chat;
    UserController.searchForUserByLogin(login).then(result => {
        const users: number[] = result.map(item => item.id);
        chatController.addUser({
            users,
            chatId
        });
    }
    )
        .then(() => {
            store.set(ADD_USER_MODAL_NAME, false);
        });
}

class AddUserForm extends Block {
    constructor() {

        super('form', {
            attrs: {
                'class': 'popup__form',
                'id': FORM_NAME,
                'name': FORM_NAME,
                novalidate: true
            },
            events: {
                'submit': (event) => handleSubmit(event, FORM_NAME, button, handleSubmitCallback)
            },
            login,
            button
        });
    }

    render() {
        const template = `<h2 class="form__title">Добавить пользователя</h2>
                    <input id="login">
                    <button id="button"></button>`;
        return this.compile(template);
    }
}

export default AddUserForm;
