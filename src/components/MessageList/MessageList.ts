import store from '../../utils/Store';
import Block from '../../utils/Block';
import './MessageList.css';
import Message from '../Message/Message';


function getTemplate(messages = []) {
    return messages.map(item => {
        return `<li id="${'message_' + item.id}"></li>`;
    }).join('');
}

class MessageList extends Block {

    constructor(props) {
        console.log('MessageList constructor', props);
        const userId = store.getState().user.id;
        const propsWithMessages = {};
        const onClick = (id) => {
            console.log('click', id);
        };
        for (const item of props.messages) {
            propsWithMessages[`${'message_' + item.id}`] = new Message({
                ...item,
                isMine: item.user_id === userId,
                events: {'click': () => onClick(item.id)}
            });
        }
        super('ul', {
            ...propsWithMessages,
            attrs: {
                'class': 'message-list'
            }
        });
    }

    render() {
        console.log('render', this);
        const template = getTemplate(this.props.messages);
        return this.compile(template);
    }
}

export default MessageList;
