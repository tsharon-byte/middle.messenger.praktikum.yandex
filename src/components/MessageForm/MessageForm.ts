import Block from '../../utils/Block';
import Input from '../Input/Input';
import {getFormValues, onInput} from '../../utils/validation';

const FORM_NAME = 'sendMessageForm';

class MessageForm extends Block {
    constructor(props) {
        super('form', {
            ...props,
            attrs: {'class': 'preview__footer', 'name': FORM_NAME, 'novalidate': true},
            events: {
                'submit': (event) => {
                    event.preventDefault();
                    console.log('submitted', getFormValues(FORM_NAME));
                }
            },
            messageInput: new Input({
                className: 'preview__input',
                placeholder: 'Сообщение',
                name: 'message',
                minlength: '1',
                pattern: '.+',
                'required': true,
                events: {
                    'input': (event) => onInput(event, 'message', props.button, FORM_NAME)
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