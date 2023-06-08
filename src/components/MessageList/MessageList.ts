import Block from '../../utils/Block';
import './MessageList.css';
import Message from '../Message/Message';
import store, {UPDATED} from '../../utils/store';
import {CURRENT_CHAT_NAME} from '../../config/constant';
import ChatController from '../../controller/ChatController';


function getTemplate(messages = []) {
    return messages.map(item => {
        return `<li id="${'message_' + item.id}"></li>`;
    }).join('');
}

class MessageList extends Block {

    constructor(props) {
        const propsWithMessages = {};
        const onClick = (id) => {
            console.log('click', id);
        };
        for (const item of props.messages) {
            propsWithMessages[`${'message_' + item.id}`] = new Message({
                ...item,
                events: {'click': () => onClick(item.id)}
            });
        }
        super('ul', {
            ...propsWithMessages,
            attrs: {
                'class': 'message-list'
            }
        });
        store.on(UPDATED, () => {
            const chatId = store.getState()[CURRENT_CHAT_NAME];
            console.log('receive all messages here by current chat ID', chatId);
            this.setProps({
                messages: ChatController.getAllMessages()
            });
        });
    }

    componentDidMount() {
        super.componentDidMount();this.setProps({
            messages: ChatController.getAllMessages()
        });
    }

    render() {
        const template = getTemplate(this.props.messages);
        return this.compile(template);
    }
}

export default MessageList;
