import Block from '../../utils/Block';
import Button from '../Button/Button';
import {handleSubmit} from '../../utils/validation';
import chatController from '../../controller/ChatController';
import store from '../../utils/Store';
import {REMOVE_CHAT_MODAL_NAME} from '../../config/constant';

const FORM_NAME = 'removeChatPopupForm';
const button = new Button({className: 'button form__button', children: 'Удалить'});

function handleSubmitCallback(data) {
    const chatId = store.getState().chat;
    if (chatId) {
        chatController.removeChat(chatId)
            .then(() => {
                chatController.getAll();
            }).then((result) => {
                store.set(REMOVE_CHAT_MODAL_NAME, false);
            }).catch(error => console.log(error));
    }
}

class RemoveChatForm extends Block {
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
            button
        });
    }

    render() {
        const template = `<h2 class="form__title">Вы уверены?</h2>
                          <button id="button"></button>`;
        return this.compile(template);
    }
}

export default RemoveChatForm;
