import Block from '../../utils/Block';
import './MessageList.css';
import Message from '../Message/Message';

class MessageList extends Block {

    constructor(props: { messages: MessageType[] }) {
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
            ...props,
            ...propsWithMessages,
            attrs: {
                'class': 'message-list'
            }
        });
    }

    render() {
        const template = this.props.messages.map(item => {
            return `<li id="${'message_' + item.id}"></li>`;
        }).join('');
        return this.compile(template);
    }
}

export default MessageList;
