import Chats from '../components/Chats/Chats';
import messages from '../utils/messages';
import MessageList from '../components/MessageList/MessageList';
import MessageForm from '../components/MessageForm/MessageForm';
import Block from '../utils/Block';
import store, {UPDATED} from '../utils/Store';
import Link from '../components/Link/Link';
import {DEFAULT_AVATAR} from '../config/config';
import Popup from '../components/Popup/Popup';
import AddChatForm from '../components/AddChatForm/AddChatForm';
import Button from '../components/Button/Button';
import {ADD_CHAT_MODAL_NAME} from '../config/constant';
import ChatController from '../controller/ChatController';

const messageList = new MessageList({messages});
const chatList = new Chats({chats: []});
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
                            <button id="createChat">Создать чат</button>
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
                    </div>
<div id="modal"></div>`;
}

class Home extends Block {
    private chats: Chats;

    constructor() {
        console.log('Home constructor');
        super('section', {
            attrs: {
                'class': 'chat'
            },
            link,
            modal: new Popup({children: new AddChatForm(), name: ADD_CHAT_MODAL_NAME}),
            chats: chatList,
            createChat: new Button({
                className: '',
                text: 'Создать чат', events: {
                    'click': () => {
                        store.set(ADD_CHAT_MODAL_NAME, true);
                    }
                }
            }),
            messages: messageList,
            messageForm: messageForm
        });
        store.on(UPDATED, () => {
            this.setProps({
                user: store.getState().user,
            });
            this.propsAndComponents.chats.setProps({chats: store.getState().chats});
        });
    }

    componentDidMount() {
        console.log('componentDidMount Home');
        ChatController.getAll();
    }

    render() {
        console.log('render Home');
        const user: UserType | NonNullable<unknown> = this.props.user || {};
        const template = getTemplate(user);
        return this.compile(template);
    }
}

export default Home;
