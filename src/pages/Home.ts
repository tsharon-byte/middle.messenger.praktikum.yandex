import Chats from '../components/Chats/Chats';
import {chats} from '../utils/mockData';
import messages from '../utils/messages';
import MessageList from '../components/MessageList/MessageList';
import MessageForm from '../components/MessageForm/MessageForm';
import Block from '../utils/Block';
import Button from '../components/Button/Button';

const messageList = new MessageList({messages});
const current = localStorage.getItem('id') || '1';
const chatList = new Chats({chats});
const messageForm = new MessageForm({button: new Button({className:'button preview__enter'})});
const currentItem = chats.find(item => item.id === current) || {};

class Home extends Block {
    constructor(props) {
        super('section', {
            ...props,
            attrs: {
                'class': 'chat'
            },
            chats: chatList,
            messages: messageList,
            messageForm: messageForm
        });
    }

    render() {
        const template = `<nav class="chat__navigation">
                        <div class="chat__profile">
                            <a href="/settings" class="link chat__link">
                                <span>Профиль</span>
                                <span class="chat__button"></span>
                            </a>
                        </div>
                        <input class="search" type="text" placeholder="Поиск"/>
                        <div id="chats"></div>
                    </nav>
                    <div class="preview">
                        <div class="preview__header">
                            <div class="user">
                                <img class="user__avatar" src=${currentItem.avatar}/>
                                <span class="user__name">${currentItem.name}</span>
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
        return this.compile(template);
    }
}
export default Home;
