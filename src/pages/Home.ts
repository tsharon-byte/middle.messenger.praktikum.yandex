import Chats from '../components/Chats/Chats';
import {chats} from '../utils/mockData';
import messages from '../utils/messages';
import MessageList from '../components/MessageList/MessageList';
import MessageForm from '../components/MessageForm/MessageForm';
import Block from '../utils/Block';
import store, {UPDATED} from '../utils/Store';
import Link from '../components/Link/Link';
import {DEFAULT_AVATAR} from '../config/config';

const messageList = new MessageList({messages});
const chatList = new Chats({chats});
const messageForm = new MessageForm();
const link = new Link({
    href: '/settings',
    className: 'link chat__link',
    children: '<span>Профиль</span>\n' + '<span class="chat__button"></span>'
});

function getTemplate(user) {
    let {avatar, firstName} = user;
    if (!avatar) {
        avatar = DEFAULT_AVATAR;
    }
    return `<nav class="chat__navigation">
                        <div class="chat__profile">
                            <div id="link"></div>
                        </div>
                        <input class="search" type="text" placeholder="Поиск"/>
                        <div id="chats"></div>
                    </nav>
                    <div class="preview">
                        <div class="preview__header">
                            <div class="user">
                                <img class="user__avatar" src=${avatar}/>
                                <span class="user__name">${firstName}</span>
                            </div>
                            <button class="button menu">
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                            </button>
                        </div>
                        <div class="preview__main">
                        <div id="messages"></div>
                        </div>
                       <div id="messageForm"></div>
                    </div>`;
}

class Home extends Block {
    constructor() {
        super('section', {
            attrs: {
                'class': 'chat'
            },
            link,
            chats: chatList,
            messages: messageList,
            messageForm: messageForm
        });
        store.on(UPDATED, () => {
            this.setProps({user: store.getState().user});
        });
    }

    render() {
        const user: UserType | NonNullable<unknown> = this.props.user || {};
        console.log('store', store.getState());
        console.log('user', user);
        const template = getTemplate(user);
        return this.compile(template);
    }
}

export default Home;
