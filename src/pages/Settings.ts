import {chats} from '../utils/mockData';
import Block from '../utils/Block';

class Settings extends Block {
    constructor() {
        super('section', {
            attrs: {
                'class': 'settings'
            }
        });
    }

    render() {
        const current = localStorage.getItem('id') || '1';
        const currentItem: ChatType = chats.find(item => item.id === current);
        const mockString = '-';
        const template = `<a class="link settings__back" href="/" onclick="router(event)">
                        <button class="button settings__button">
                        </button>
                    </a>
                    <div class="settings__content">
                        <div class="settings__header">
                            <img class="settings__avatar" src=${currentItem.avatar}/>
                            <div class="settings__name">${currentItem.name || mockString}</div>
                        </div>
                        <form class="settings__main" name="settings">
                            <div class="settings__field">
                                <label class="settings__label">Почта</label>
                                <input class="settings__input" type="email" name="email" readonly value=${currentItem.email || mockString}>
                            </div>                        
                            <div class="settings__field">
                                <label class="settings__label">Логин</label>
                                <input class="settings__input" type="text" name="login" readonly value=${currentItem.login || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Имя</label>
                                <input class="settings__input" type="text" name="first_name" readonly value=${currentItem.name || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Фамилия</label>
                                <input class="settings__input" type="text" name="second_name" readonly value=${currentItem.secondName || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Имя в чате</label>
                                <input class="settings__input" type="text" name="display_name" readonly value=${currentItem.displayName || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Телефон</label>
                                <input class="settings__input" type="text" name="phone" readonly value=${currentItem.phone || mockString}>
                            </div>
                        </form>
                        <div class="settings__footer">
                            <div class="settings__link"><a class="link" href="/change-profile" onclick="router(event)">Изменить данные</a></div>
                            <div class="settings__link"><a class="link" href="/change-password" onclick="router(event)">Изменить пароль</a></div>
                            <div class="settings__link"><a class="link" href="/" onclick="router(event)">Выйти</a></div>
                        </div>
                    </div>`;
        return this.compile(template);
    }
}

export default Settings;
