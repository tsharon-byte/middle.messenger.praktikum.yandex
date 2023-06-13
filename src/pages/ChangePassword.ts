import Block from '../utils/Block';
import ChangePasswordForm from '../components/ChangePasswordForm/ChangePasswordForm';
import Link from '../components/Link/Link';
import {transformAvatar} from '../config/constant';
import store, {UPDATED} from '../utils/Store';

const link = new Link({
    href: '/messenger',
    className: 'link settings__back',
    children: '<button class="button settings__button"></button>'
});

function getTemplate(user) {
    return `<div id="link"></div>
                          <div class="settings__content">
                            <div class="settings__header">
                              <img class="settings__avatar" src=${transformAvatar(user.avatar)}>
                              <div class="settings__name">${user.firstName || ''}</div>
                            </div>
                            <form id="changePasswordForm"></form>
                          </div>`;
}

class ChangePassword extends Block {
    constructor() {
        super('section', {
            attrs: {
                'class': 'settings'
            },
            link,
            changePasswordForm: new ChangePasswordForm()
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

export default ChangePassword;
