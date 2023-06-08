import Block from '../utils/Block';
import ChangePasswordForm from '../components/ChangePasswordForm/ChangePasswordForm';
import Link from '../components/Link/Link';
import store from '../utils/Store';
import {DEFAULT_AVATAR} from '../config/config';

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
        const user = store.getState().user || {};
        const mockString = '-';
        const template = `<div id="link"></div>
                          <div class="settings__content">
                            <div class="settings__header">
                              <img class="settings__avatar" src=${user.avatar || DEFAULT_AVATAR}/>
                              <div class="settings__name">${user.firstName || mockString}</div>
                            </div>
                            <form id="changePasswordForm"></form>
                          </div>`;
        return this.compile(template);
    }
}

export default ChangePassword;
