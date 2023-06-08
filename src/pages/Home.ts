import Chats from '../components/Chats/Chats';
import MessageList from '../components/MessageList/MessageList';
import MessageForm from '../components/MessageForm/MessageForm';
import Block from '../utils/Block';
import store, {UPDATED} from '../utils/Store';
import Link from '../components/Link/Link';
import {DEFAULT_AVATAR} from '../config/config';
import Popup from '../components/Popup/Popup';
import AddChatForm from '../components/AddChatForm/AddChatForm';
import Button from '../components/Button/Button';
import {ADD_CHAT_MODAL_NAME, ADD_USER_MODAL_NAME, CURRENT_CHAT_NAME, REMOVE_USER_MODAL_NAME} from '../config/constant';
import ChatController from '../controller/ChatController';
import AddUserForm from '../components/AddUserForm/AddUserForm';
import RemoveUserForm from '../components/RemoveUserForm/RemoveUserForm';

const messageList = new MessageList({messages: []});
const chatList = new Chats({chats: []});
const messageForm = new MessageForm();

const link = new Link({
    href: '/settings',
    className: 'link chat__link',
    children: '<span>Профиль</span>\n' + '<span class="chat__button"></span>'
});

function getTemplate(chat) {
    let {avatar} = chat;
    const {title} = chat;
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
                                <span class="user__name">${title}</span>
                            </div>
                            <div class="dropdown">
                                <button class="button dropdown__menu">
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                </button>
                                <ul class="dropdown__content">
                                    <li class="dropdown__item" id="addUser">
                                    </li>
                                    <li class="dropdown__item" id="removeUser">
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="preview__main">
                            <div id="messages"></div>
                        </div>
                        <div id="messageForm"></div>
                    </div>
<div id="modal"></div>
<div id="addUserModal"></div>
<div id="removeUserModal"></div>`;
}

class Home extends Block {
    private chats: Chats;

    constructor() {
        super('section', {
            attrs: {
                'class': 'chat'
            },
            link,
            modal: new Popup({children: new AddChatForm(), name: ADD_CHAT_MODAL_NAME}),
            addUserModal: new Popup({children: new AddUserForm(), name: ADD_USER_MODAL_NAME}),
            removeUserModal: new Popup({children: new RemoveUserForm(), name: REMOVE_USER_MODAL_NAME}),
            chats: chatList,
            addUser: new Button({
                className: 'dropdown__item',
                children: '<div class="dropdown__add"></div><span>Добавить пользователя</span>',
                events: {
                    'click': () => {
                        store.set(ADD_USER_MODAL_NAME, true);
                    }
                }
            }),
            removeUser: new Button({
                className: 'dropdown__item',
                children: '<div class="dropdown__remove"></div><span>Удалить пользователя</span>',
                events: {
                    'click': () => {
                        store.set(REMOVE_USER_MODAL_NAME, true);
                    }
                }
            }),
            createChat: new Button({
                className: '',
                children: 'Создать чат',
                events: {
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
                chat: store.getState().chats.find(item => item.id === store.getState()[CURRENT_CHAT_NAME]),
            });
            this.propsAndComponents.chats.setProps({chats: store.getState().chats});
        });
    }

    componentDidMount() {
        ChatController.getAll();
    }

    render() {
        const chat = this.props.chat || {};
        console.log('chat', chat);
        const template = getTemplate(chat);
        return this.compile(template);
    }
}

export default Home;
