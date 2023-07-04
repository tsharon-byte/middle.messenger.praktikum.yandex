import Chats from '../components/Chats/Chats';
import MessageList from '../components/MessageList/MessageList';
import MessageForm from '../components/MessageForm/MessageForm';
import Block from '../utils/Block/Block';
import store, {UPDATED} from '../utils/Store';
import Link from '../components/Link/Link';
import Popup from '../components/Popup/Popup';
import AddChatForm from '../components/AddChatForm/AddChatForm';
import Button from '../components/Button/Button';
import {
    ADD_CHAT_MODAL_NAME,
    ADD_USER_MODAL_NAME,
    REMOVE_CHAT_MODAL_NAME,
    REMOVE_USER_MODAL_NAME,
    transformAvatar
} from '../config/constant';
import ChatController from '../controller/ChatController';
import AddUserForm from '../components/AddUserForm/AddUserForm';
import RemoveUserForm from '../components/RemoveUserForm/RemoveUserForm';
import RemoveChatForm from '../components/RemoveChatForm/RemoveChatForm';
import messageController from '../controller/MessageController';

const link = new Link({
    href: '/settings',
    className: 'link chat__link',
    children: '<span>Профиль</span>\n' + '<span class="chat__button"></span>'
});

function getPreview(chat:ChatType) {

    let preview = `<div class="preview">
                        <div class="preview__header">
                        </div>
                        <div class="preview__stub">
                        Выберите чат чтобы отправить сообщение
                        </div>
                    </div>`;
    if (chat) {
        const {title, avatar} = chat;
        preview = `<div class="preview">
                        <div class="preview__header">
                            <div class="user">
                                <img class="user__avatar" src=${transformAvatar(avatar)} >
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
                                    <li class="dropdown__item" id="removeChat">
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="preview__main">
                            <div id="messages"></div>
                        </div>
                        <div id="messageForm"></div>
                    </div>`;
    }
    return preview;
}

function getTemplate(chat:ChatType) {
    const preview = getPreview(chat);
    return `<nav class="chat__navigation">
                        <div class="chat__profile">
                            <button id="createChat">Создать чат</button>
                            <div id="link"></div>
                        </div>
                        <input class="search" type="text" placeholder="Поиск"/>
                        <div id="chats"></div>
                    </nav>
                    ${preview}
<div id="modal"></div>
<div id="addUserModal"></div>
<div id="removeUserModal"></div>
<div id="removeChatModal"></div>`;
}

class Home extends Block {
    //private chats: Chats;

    constructor() {
        super('section', {
            attrs: {
                'class': 'chat'
            },
            link,
            modal: new Popup({children: new AddChatForm(), name: ADD_CHAT_MODAL_NAME}),
            addUserModal: new Popup({children: new AddUserForm(), name: ADD_USER_MODAL_NAME}),
            removeUserModal: new Popup({children: new RemoveUserForm(), name: REMOVE_USER_MODAL_NAME}),
            removeChatModal: new Popup({children: new RemoveChatForm(), name: REMOVE_CHAT_MODAL_NAME}),
            chats: new Chats({chats: store.getState().chats}),
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
            removeChat: new Button({
                className: 'dropdown__item',
                children: '<div class="dropdown__remove"></div><span>Удалить чат</span>',
                events: {
                    'click': () => {
                        store.set(REMOVE_CHAT_MODAL_NAME, true);
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
            messages: new MessageList({messages: store.getState().messages}),
            messageForm: new MessageForm()
        });
        store.on(UPDATED, () => {
            this.setProps({
                chat: store.getState().chats.find(item => +item.id === store.getState().chat),
            });
            this.propsAndComponents.chats.setProps({chats: store.getState().chats});
            this.propsAndComponents.messages.setProps({messages: store.getState().messages});
        });
    }

    componentDidMount() {
        ChatController.getAll();
        if (this.props.chat) {
            ChatController.requestMessageToken(this.props.chat.id).then(result => {
                const token = result.token;
                messageController.connect({
                    userId: store.getState().user.id,
                    chatId: this.props.chat.id,
                    token
                });
                messageController.getMessages({offset: 0});
            });
        }
    }

    render() {
        const chat = this.props.chat;
        const template = getTemplate(chat);
        return this.compile(template);
    }
}

export default Home;
