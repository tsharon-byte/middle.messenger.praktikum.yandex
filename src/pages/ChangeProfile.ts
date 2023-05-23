import {chats} from '../utils/mockData';
import Block from '../utils/Block';
import ChangeProfileForm from '../components/ChangeProfileForm/ChangeProfileForm';

class ChangeProfile extends Block {
    constructor() {
        super('section', {
            attrs: {
                'class': 'settings'
            },
            changeProfileForm: new ChangeProfileForm()
        });
    }

    render() {
        const current = localStorage.getItem('id') || '1';
        const currentItem: ChatType = chats.find(item => item.id === current);
        const mockString = '-';
        const template = `<a class="link settings__back" href="/messenger">
                        <button class="button settings__button">
                        </button>
                    </a>
                    <div class="settings__content">
                        <div class="settings__header">
                            <img class="settings__avatar" src=${currentItem.avatar}/>
                            <div class="settings__name">${currentItem.name || mockString}</div>
                        </div>
                        <div id="changeProfileForm"></div>
                    </div>`;
        return this.compile(template);
    }
}

export default ChangeProfile;
