import {chats} from '../utils/mockData';
import Block from '../utils/Block';
import ChangePasswordForm from '../components/ChangePasswordForm/ChangePasswordForm';

class ChangePassword extends Block {
    constructor() {
        super('section', {
            attrs: {
                'class': 'settings'
            },
            changePasswordForm: new ChangePasswordForm()
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
                        <form id="changePasswordForm"></form>
                    </div>`;
        return this.compile(template);
    }
}

export default ChangePassword;
