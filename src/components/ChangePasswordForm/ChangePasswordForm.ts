import Block from '../../utils/Block/Block';
import Button from '../Button/Button';
import {handleSubmit, onInput} from '../../utils/validation';
import Input from '../Input/Input';
import UserController from '../../controller/UserController';

const FORM_NAME = 'changePasswordForm';
const button = new Button({className: 'button form__button', children: 'Сохранить'});

class ChangePasswordForm extends Block {
    constructor() {
        super('form', {
            attrs: {'class': 'settings__main', 'name': FORM_NAME, 'novalidate': true},
            events: {
                'submit': (event: Event) => handleSubmit(event, FORM_NAME, button, UserController.changeUserPassword)
            },
            button,
            oldPasswordInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Пароль',
                name: 'old_password',
                minlength: '8',
                maxlength: '40',
                type: 'text',
                pattern: '^(?=.*\\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$',
                events: {
                    'input': (event: Event) => onInput(event, 'old_password', button, FORM_NAME)
                }
            }),
            newPasswordInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Пароль',
                name: 'new_password',
                minlength: '8',
                maxlength: '40',
                type: 'text',
                pattern: '^(?=.*\\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$',
                events: {
                    'input': (event: Event) => onInput(event, 'new_password', button, FORM_NAME)
                }
            }),
            newPassword2Input: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Пароль',
                name: 'new_password2',
                minlength: '8',
                maxlength: '40',
                type: 'text',
                pattern: '^(?=.*\\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$',
                events: {
                    'input': (event: Event) => onInput(event, 'new_password2', button, FORM_NAME)
                }
            }),
        });
    }

    render() {
        const template = `<div class="settings__field">
                                <label class="settings__label" for="old_password">Старый пароль</label>
                                <input id="oldPasswordInput">
                            </div>
                            <div class="settings__field">
                                <label class="settings__label" for="new_password">Новый Пароль</label>
                                <input id="newPasswordInput">
                            </div>
                            <div class="settings__field">
                                <label class="settings__label" for="new_password2">Повторите новый пароль</label>
                                <input id="newPassword2Input">
                            </div>
                            <button id="button"></button>`;
        return this.compile(template);
    }
}

export default ChangePasswordForm;
