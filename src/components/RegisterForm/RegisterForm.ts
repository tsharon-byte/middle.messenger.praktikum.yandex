import Block from '../../utils/Block/Block';
import Button from '../Button/Button';
import Input from '../Input/Input';
import {checkPassword, handleSubmit, onInput} from '../../utils/validation';
import authController from '../../controller/AuthController';
import Link from '../Link/Link';

const FORM_NAME = 'registerForm';

const link = new Link({
    href: '/',
    className: 'link form__link',
    children: 'Войти'
});

class RegisterForm extends Block {
    constructor() {
        const button = new Button({className: 'button form__button', children: 'Зарегистрироваться'});
        super('form', {
            attrs: {'class': 'form', 'name': FORM_NAME, 'novalidate': true},
            events: {
                'submit': (event:Event) => handleSubmit(event, FORM_NAME, button, authController.signup)
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
            emailInput: new Input({
                className: 'input',
                placeholder: 'Почта',
                name: 'email',
                pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$',
                type: 'text',
                events: {
                    'input': (event:Event) => onInput(event, 'email', button, FORM_NAME)
                }
            }),
            firstNameInput: new Input({
                className: 'input',
                placeholder: 'Имя',
                name: 'first_name',
                pattern: '^[А-ЯA-Z]{1}[a-zА-Яа-яA-Z\\-]*',
                events: {
                    'input': (event:Event) => onInput(event, 'first_name', button, FORM_NAME)
                }
            }),
            secondNameInput: new Input({
                className: 'input',
                placeholder: 'Фамилия',
                name: 'second_name',
                pattern: '^[А-ЯA-Z]{1}[a-zА-Яа-яA-Z\\-]*',
                events: {
                    'input': (event:Event) => onInput(event, 'second_name', button, FORM_NAME)
                }
            }),
            phoneInput: new Input({
                className: 'input',
                placeholder: 'Телефон',
                name: 'phone',
                minlength: '10',
                maxlength: '15',
                pattern: '^\\+?[0-9]{10,15}',
                events: {
                    'input': (event:Event) => onInput(event, 'phone', button, FORM_NAME)
                }
            }),
            passwordInput: new Input({
                className: 'input',
                placeholder: 'Пароль',
                name: 'password',
                minlength: '8',
                maxlength: '40',
                type: 'password',
                pattern: '^(?=.*\\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$',
                events: {
                    'input': (event:Event) => onInput(event, 'password', button, FORM_NAME)
                }
            }),
            password2Input: new Input({
                className: 'input',
                placeholder: 'Пароль ещё раз',
                name: 'password2',
                minlength: '8',
                maxlength: '40',
                type: 'password',
                pattern: '^(?=.*\\d)(?=.*[A-Z])[a-zA-Z0-9]{8,40}$',
                events: {
                    'input': (event:Event) => {
                        onInput(event, 'password2', button, FORM_NAME);
                        checkPassword(event, FORM_NAME, 'password', 'password2', button);
                    }
                }
            }),
        });
    }

    render() {
        const template = `<div class="form__content">
                                    <div class="form__input-group">
                                         <label class="label" for="email">Почта</label>
                                         <input id="emailInput"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="login">Логин</label>
                                        <input id="loginInput"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="first_name">Имя</label>
                                        <input id="firstNameInput"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="second_name">Фамилия</label>
                                        <input id="secondNameInput"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="phone">Телефон</label>
                                        <input id="phoneInput"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="password">Пароль</label>
                                        <input id="passwordInput"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="password2">Пароль ещё раз</label>
                                        <input id="password2Input"/>
                                    </div>
                                </div>
                                <div class="form__footer">
                                    <button id="button"></button>
                                    <div id="link"></div>
                                </div>`;
        return this.compile(template);
    }
}

export default RegisterForm;
