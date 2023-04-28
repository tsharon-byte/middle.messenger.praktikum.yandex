import Block from '../../utils/Block';
import {chats} from '../../utils/mockData';
import Button from '../Button/Button';
import Input from '../Input/Input';
import {handleSubmit, onInput} from '../../utils/validation';

const FORM_NAME = 'changeProfileForm';
const mockString = '-';
const current = localStorage.getItem('id') || '1';
const currentItem: ChatType = chats.find(item => item.id === current);
const button = new Button({className: 'button form__button', text: 'Сохранить'});

class ChangeProfileForm extends Block {
    constructor() {
        super('form', {
            attrs: {'class': 'settings__main', 'name': FORM_NAME, 'novalidate': true},
            events: {
                'submit': (event) => handleSubmit(event, FORM_NAME, button)
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
                value:currentItem.login || mockString,
                events: {
                    'input': (event) => onInput(event, 'login', button, FORM_NAME)
                }
            }),
            emailInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Почта',
                name: 'email',
                pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$',
                type: 'text',
                value:currentItem.email || mockString,
                events: {
                    'input': (event) => onInput(event, 'email', button, FORM_NAME)
                }
            }),
            firstNameInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Имя',
                name: 'first_name',
                pattern: '^[А-ЯA-Z]{1}[a-zА-Яа-яA-Z\\-]*',
                value:currentItem.name || mockString,
                events: {
                    'input': (event) => onInput(event, 'first_name', button, FORM_NAME)
                }
            }),
            secondNameInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Фамилия',
                name: 'second_name',
                pattern: '^[А-ЯA-Z]{1}[a-zА-Яа-яA-Z\\-]*',
                value:currentItem.secondName || mockString,
                events: {
                    'input': (event) => onInput(event, 'second_name', button, FORM_NAME)
                }
            }),
            displayNameInput: new Input({
                className: 'settings__input',
                containerClassName: 'form__input',
                placeholder: 'Имя в чате',
                name: 'display_name',
                pattern: '^[А-ЯA-Z]{1}[a-zА-Яа-яA-Z\\-]*',
                value:currentItem.displayName || mockString,
                events: {
                    'input': (event) => onInput(event, 'second_name', button, FORM_NAME)
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
                value:currentItem.phone || mockString,
                events: {
                    'input': (event) => onInput(event, 'phone', button, FORM_NAME)
                }
            }),
        });
    }

    render() {
        const template=`<div class="settings__field">
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
        return this.compile(template);
    }
}

export default ChangeProfileForm;
