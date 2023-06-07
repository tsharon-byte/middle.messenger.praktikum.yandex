import Block from '../utils/Block';
import store, {UPDATED} from '../utils/Store';
import Button from '../components/Button/Button';
import AuthController from '../controller/AuthController';
import Link from '../components/Link/Link';
import {DEFAULT_AVATAR} from '../config/config';


const authController = new AuthController();
const button = new Button({
    className: 'link',
    children: 'Выйти',
    events: {
        'click': (event) => {
            event.preventDefault();
            authController.logout();
        }
    }
});

const link = new Link({
    href: '/messenger',
    className: 'link settings__back',
    children: '<button class="button settings__button"></button>'
});

const linkChangeProfile = new Link({
    href: '/change-profile',
    className: 'link',
    children: 'Изменить данные'
});

const linkChangePassword = new Link({
    href: '/change-password',
    className: 'link',
    children: 'Изменить пароль'
});

const mockString = '-';

function getTemplate(user) {
    return `<div id="link"></div>
                    <div class="settings__content">
                        <div class="settings__header">
                            <img class="settings__avatar" src=${user.avatar || DEFAULT_AVATAR}/>
                            <div class="settings__name">${user.firstName || mockString}</div>
                        </div>
                        <form class="settings__main" name="settings">
                            <div class="settings__field">
                                <label class="settings__label">Почта</label>
                                <input class="settings__input" type="email" name="email" readonly value=${user.email || mockString}>
                            </div>                        
                            <div class="settings__field">
                                <label class="settings__label">Логин</label>
                                <input class="settings__input" type="text" name="login" readonly value=${user.login || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Имя</label>
                                <input class="settings__input" type="text" name="first_name" readonly value=${user.firstName || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Фамилия</label>
                                <input class="settings__input" type="text" name="second_name" readonly value=${user.secondName || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Имя в чате</label>
                                <input class="settings__input" type="text" name="display_name" readonly value=${user.displayName || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Телефон</label>
                                <input class="settings__input" type="text" name="phone" readonly value=${user.phone || mockString}>
                            </div>
                        </form>
                        <div class="settings__footer">
                            <div class="settings__link"><div id="linkChangeProfile"></div></div>
                            <div class="settings__link"><div id="linkChangePassword"></div></div>
                            <div class="settings__link"><div id="button"></div></div>
                        </div>
                    </div>`;
}

class Settings extends Block {
    constructor() {
        super('section', {
            attrs: {
                'class': 'settings'
            },
            button,
            link,
            linkChangeProfile,
            linkChangePassword
        });
        store.on(UPDATED, () => {
            this.setProps({user: store.getState().user});
        });
    }

    render() {
        const user: UserType | NonNullable<unknown> = this.props.user || {};
        const template = getTemplate(user);
        return this.compile(template);
    }
}

export default Settings;
