import Block from '../utils/Block';
import store, {UPDATED} from '../utils/Store';
import Button from '../components/Button/Button';
import authController from '../controller/AuthController';
import Link from '../components/Link/Link';
import Popup from '../components/Popup/Popup';
import {CHANGE_AVATAR_MODAL_NAME, transformAvatar} from '../config/constant';
import ChangeAvatarForm from '../components/ChangeAvatarForm/ChangeAvatarForm';

const button = new Button({
    className: 'link',
    children: 'Выйти',
    events: {
        'click': (event: Event) => {
            event.preventDefault();
            authController.logout();
        }
    }
});
const changeAvatarButton = new Button({
    className: 'settings__avatar_btn',
    children: 'Поменять аватар',
    events: {
        'click': (event: Event) => {
            event.preventDefault();
            console.log('changeAvatarButton', 'click');
            store.set(CHANGE_AVATAR_MODAL_NAME, true);
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

function getTemplate(user:UserType) {
    return `<div id="link"></div>
                    <div class="settings__content">
                        <div class="settings__header">
                            <div class="settings__avatar-container">
                                <img class="settings__avatar" src=${transformAvatar(user.avatar)}>
                                <button id="changeAvatarButton"></button>
                            </div>
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
                    </div><div id="changeAvatarModal"></div>`;
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
            linkChangePassword,
            changeAvatarButton,
            changeAvatarModal: new Popup({children: new ChangeAvatarForm(), name: CHANGE_AVATAR_MODAL_NAME}),
        });
        store.on(UPDATED, () => {
            this.setProps({user: store.getState().user});
        });
    }

    render() {
        const template = getTemplate(this.props.user || {});
        return this.compile(template);
    }
}

export default Settings;
