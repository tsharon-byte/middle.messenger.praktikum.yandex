import Block from '../../utils/Block/Block';
import Input from '../Input/Input';
import {handleSubmit, onInput} from '../../utils/validation';
import Button from '../Button/Button';
import authController from '../../controller/AuthController';
import Link from '../Link/Link';

const FORM_NAME = 'loginForm';

const link = new Link({
    href: '/sign-up',
    className: 'link form__link',
    children: 'Нет аккаунта?'
});

class LoginForm extends Block {
    constructor() {
        const button = new Button({className: 'button form__button', children: 'Войти'});
        super('form', {
            attrs: {'class': 'form', 'name': FORM_NAME, 'novalidate': true},
            events: {
                'submit': (event:Event) => handleSubmit(event, FORM_NAME, button, authController.signin)
            },
            button,
            link,
            loginInput: new Input({
                className: 'input',
                placeholder: 'Логин',
                name: 'login',
                minlength: '3',
                maxlength: '20',
                pattern: '[a-zA-Z\\-_0-9]{3,20}',
                events: {
                    'input': (event:Event) => onInput(event, 'login', button, FORM_NAME)
                }
            }),
            passwordInput: new Input({
                className: 'input',
                placeholder: 'Пароль',
                name: 'password',
                type: 'password',
                minlength: '8',
                maxlength: '40',
                pattern: '^(?=.*\\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$',
                events: {
                    'input': (event:Event) => onInput(event, 'password', button, FORM_NAME)
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
                                <div id="link"></div>
                            </div>`;
        return this.compile(template);
    }
}

export default LoginForm;
