import Block from '../../utils/Block';
import Button from '../Button/Button';
import Input from '../Input/Input';
import {handleSubmit, onInput} from '../../utils/validation';
import chatController from '../../controller/ChatController';
import store from '../../utils/Store';
import {ADD_CHAT_MODAL_NAME} from '../../config/constant';

const FORM_NAME = 'addChatPopupForm';
const button = new Button({className: 'button form__button', children: 'Добавить'});

const title = new Input({
    className: 'input',
    placeholder: 'Заголовок',
    name: 'title',
    minlength: '1',
    maxlength: '20',
    pattern: '[a-zA-Z\\-_0-9]{1,20}',
    required: true,
    events: {
        'input': (event) => onInput(event, 'title', button, FORM_NAME)
    }
});

function handleSubmitCallback(data) {
    chatController.create(data)
        .then(() => {
            chatController.getAll();
        })
        .then(() => {
            store.set(ADD_CHAT_MODAL_NAME, false);
        });
}

class AddChatForm extends Block {
    constructor() {

        super('form', {
            attrs: {
                'class': 'popup__form',
                'id': 'addChatPopupForm',
                'name': FORM_NAME,
                novalidate: true
            },
            events: {
                'submit': (event) => handleSubmit(event, FORM_NAME, button, handleSubmitCallback)
            },
            title,
            button
        });
    }

    render() {
        const template = `<h2 class="form__title">Создать чат</h2>
                    <input id="title">
                    <button id="button"></button>`;
        return this.compile(template);
    }
}

export default AddChatForm;
