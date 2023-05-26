import {chats} from '../utils/mockData';
import Block from '../utils/Block';
import ChangePasswordForm from '../components/ChangePasswordForm/ChangePasswordForm';
import Link from '../components/Link/Link';

const link = new Link({
    href: '/messenger',
    className: 'link settings__back',
    children: '<button class="button settings__button"></button>'
});

class ChangePassword extends Block {
    constructor() {
        super('section', {
            attrs: {
                'class': 'settings'
            },
            link,
            changePasswordForm: new ChangePasswordForm()
        });
    }

    render() {
        const current = localStorage.getItem('id') || '1';
        const currentItem: ChatType = chats.find(item => item.id === current);
        const mockString = '-';
        const template = `<div id="link"></div>
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
