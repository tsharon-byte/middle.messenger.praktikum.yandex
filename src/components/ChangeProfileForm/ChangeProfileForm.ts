import Block from '../../utils/Block';
import Button from '../Button/Button';
import Input from '../Input/Input';
import {handleSubmit, onInput} from '../../utils/validation';
import UserController from '../../controller/UserController';
import store, {UPDATED} from '../../utils/Store';

const FORM_NAME = 'changeProfileForm';
const mockString = '-';
const button = new Button({className: 'button form__button', children: 'Сохранить'});

function getTemplate() {
    return `<div class="settings__field">
                                <label class="settings__label" for="email">Почта</label>
                                <input id="emailInput">
                            </div>                        
                            <div class="settings__field">
                                <label class="settings__label" for="login">Логин</label>
                                <input id="loginInput">
                            </div>
                            <div class="settings__field">
                                <label class="settings__label" for="first_name">Имя</label>
                                <input id="firstNameInput">
                            </div>
                            <div class="settings__field">
                                <label class="settings__label" for="second_name">Фамилия</label>
                                <input id="secondNameInput">
                            </div>
                            <div class="settings__field">
                                <label class="settings__label" for="display_name">Имя в чате</label>
                                <input id="displayNameInput">
                            </div>
                            <div class="settings__field">
                                <label class="settings__label" for="phone">Телефон</label>
                                <input id="phoneInput">
                            </div>
                            <button id="button"></button>`;
}

class ChangeProfileForm extends Block {
    constructor(user: UserType) {
        super('form', {
            attrs: {'class': 'settings__main', 'name': FORM_NAME, 'novalidate': true},
            events: {
                'submit': (event: Event) => handleSubmit(event, FORM_NAME, button, UserController.changeUserProfile)
            },
            button,
            loginInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Логин',
                name: 'login',
                minlength: '3',
                maxlength: '20',
                pattern: '[a-zA-Z\\-_0-9]{3,20}',
                value: user.login || mockString,
                events: {
                    'input': (event: Event) => onInput(event, 'login', button, FORM_NAME)
                }
            }),
            emailInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Почта',
                name: 'email',
                pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$',
                type: 'text',
                value: user.email || mockString,
                events: {
                    'input': (event: Event) => onInput(event, 'email', button, FORM_NAME)
                }
            }),
            firstNameInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Имя',
                name: 'first_name',
                pattern: '^[А-ЯA-Z]{1}[a-zА-Яа-яA-Z\\-]*',
                value: user.firstName || mockString,
                events: {
                    'input': (event: Event) => onInput(event, 'first_name', button, FORM_NAME)
                }
            }),
            secondNameInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Фамилия',
                name: 'second_name',
                pattern: '^[А-ЯA-Z]{1}[a-zА-Яа-яA-Z\\-]*',
                value: user.secondName || mockString,
                events: {
                    'input': (event: Event) => onInput(event, 'second_name', button, FORM_NAME)
                }
            }),
            displayNameInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Имя в чате',
                name: 'display_name',
                pattern: '.*',//'^[А-ЯA-Z]{1}[a-zА-Яа-яA-Z\\-]*',
                value: user.displayName || mockString,
                events: {
                    'input': (event: Event) => onInput(event, 'second_name', button, FORM_NAME)
                }
            }),
            phoneInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Телефон',
                name: 'phone',
                minlength: '10',
                maxlength: '15',
                pattern: '^\\+?[0-9]{10,15}',
                value: user.phone || mockString,
                events: {
                    'input': (event:Event) => onInput(event, 'phone', button, FORM_NAME)
                }
            }),
        });

        store.on(UPDATED, () => {
            this.setProps({user: store.getState().user || {}});
        });
    }

    render() {
        const template = getTemplate();
        return this.compile(template);
    }
}

export default ChangeProfileForm;
