import Block from '../../utils/Block';
import Input from '../Input/Input';
import {handleSubmit, onInput} from '../../utils/validation';
import Button from '../Button/Button';
import messageController from '../../controller/MessageController';

const FORM_NAME = 'sendMessageForm';

function handleMessageSubmit(data: {message: string}) {
    messageController.sendMessage(data.message);
    messageController.getMessages({offset: 0});
}

class MessageForm extends Block {
    constructor() {
        const button = new Button({className: 'button preview__enter'});
        super('form', {
            attrs: {'class': 'preview__footer', 'name': FORM_NAME, 'novalidate': true},
            events: {
                'submit': (event:Event) => handleSubmit(event, FORM_NAME, button, handleMessageSubmit)
            },
            button,
            messageInput: new Input({
                className: 'preview__input',
                placeholder: 'Сообщение',
                name: 'message',
                minlength: '1',
                pattern: '.+',
                events: {
                    'input': (event:Event) => onInput(event, 'message', button, FORM_NAME)
                }
            }),
        });
    }

    render() {
        const template = `<button class="button preview__add"></button>
                            <input id="messageInput"/>
                            <div id="button"></div>`;
        return this.compile(template);
    }

}

export default MessageForm;
