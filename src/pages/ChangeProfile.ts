import Block from '../utils/Block';
import ChangeProfileForm from '../components/ChangeProfileForm/ChangeProfileForm';
import Link from '../components/Link/Link';
import store, {UPDATED} from '../utils/Store';
import {DEFAULT_AVATAR} from '../config/config';

const link = new Link({
    href: '/messenger',
    className: 'link settings__back',
    children: '<button class="button settings__button"></button>'
});

const mockString = '-';

function getTemplate(user) {
    return `<div id="link"></div>
                    <div class="settings__content">
                        <div class="settings__header">
                            <img class="settings__avatar" src=${user.avatar || DEFAULT_AVATAR}/>
                            <div class="settings__name">${user.firstName || mockString}</div>
                        </div>
                        <div id="changeProfileForm"></div>
                    </div>`;
}

class ChangeProfile extends Block {
    constructor() {
        super('section', {
            attrs: {
                'class': 'settings'
            },
            link,
            changeProfileForm: new ChangeProfileForm(store.getState().user)
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

export default ChangeProfile;
