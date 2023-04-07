import {messages} from "../utils/mockData";

const Settings = {
    render: () => {
        const current = localStorage.getItem('id') || '1';
        const currentItem = messages.find(item => item.id === current) || {};
        const mockString = '-';
        return `<section class="settings">
                    <a class="link settings__back" href="/" onclick="router(event)">
                        <button class="button settings__button">
                        </button>
                    </a>
                    <div class="settings__content">
                        <div class="settings__header">
                            <img class="settings__avatar" src=${currentItem.avatar}/>
                            <div class="settings__name">${currentItem.name || mockString}</div>
                        </div>
                        <div class="settings__main">
                            <div class="settings__field">
                                <label class="settings__label">Почта</label>
                                <input class="settings__input" name="email" readonly value=${currentItem.email || mockString}>
                            </div>                        
                            <div class="settings__field">
                                <label class="settings__label">Логин</label>
                                <input class="settings__input" name="login" readonly value=${currentItem.login || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Имя</label>
                                <input class="settings__input" name="first_name" readonly value=${currentItem.name || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Фамилия</label>
                                <input class="settings__input" name="second_name" readonly value=${currentItem.secondName || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Имя в чате</label>
                                <input class="settings__input" name="display_name" readonly value=${currentItem.displayName || mockString}>
                            </div>
                            <div class="settings__field">
                                <label class="settings__label">Телефон</label>
                                <input class="settings__input" name="phone" readonly value=${currentItem.phone || mockString}>
                            </div>
                        </div>
                        <div class="settings__footer">
                            <div class="settings__link"><a class="link" href="/" onclick="router(event)">Изменить данные</a></div>
                            <div class="settings__link"><a class="link" href="/" onclick="router(event)">Изменить пароль</a></div>
                            <div class="settings__link"><a class="link" href="/" onclick="router(event)">Выйти</a></div>
                        </div>
                    </div>
                </section>`
    }
}

export default Settings;