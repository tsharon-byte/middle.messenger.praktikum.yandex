import Block from '../../utils/Block';
import Input from '../Input/Input';
import {handleSubmit, onInput} from '../../utils/validation';
import Button from '../Button/Button';

const FORM_NAME = 'loginForm';

class LoginForm extends Block {
    constructor() {
        const button = new Button({className: 'button form__button', text: 'Войти'});
        super('form', {
            attrs: {'class': 'form', 'name': FORM_NAME, 'novalidate': true},
            events: {
                'submit': (event) => handleSubmit(event, FORM_NAME, button)
            },
            button,
            loginInput: new Input({
                className: 'input',
                placeholder: 'Логин',
                name: 'login',
                minlength: '3',
                maxlength: '20',
                pattern: '[a-zA-Z\\-_0-9]{3,20}',
                events: {
                    'input': (event) => onInput(event, 'login', button, FORM_NAME)
                }
            }),
            passwordInput: new Input({
                className: 'input',
                placeholder: 'Пароль',
                name: 'password',
                minlength: '8',
                maxlength: '40',
                pattern: '^(?=.*\\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$',
                events: {
                    'input': (event) => onInput(event, 'password', button, FORM_NAME)
                }
            }),
        });
    }

    render() {
        const template = `<div class="form__content">
                                <div class="form__input-group">
                                     <label class="label" for="login">Логин</label>
                                     <input id="loginInput"/>
                                </div>
                                <div class="form__input-group">
                                    <label class="label" for="password">Пароль</label>
                                    <input id="passwordInput"/>
                                </div>
                            </div>
                            <div class="form__footer">
                                <button id="button"></button>
                                <a class="link form__link" href="/signup" onclick="router(event)">Нет аккаунта?</a>
                            </div>`;
        return this.compile(template);
    }
}

export default LoginForm;
