import store from '../../utils/Store';
import Block from '../../utils/Block/Block';
import './MessageList.css';
import Message from '../Message/Message';


function getTemplate(messages: MessageType[] = []) {
    return messages.map((item: MessageType) => {
        return `<li id="${'message_' + item.id}"></li>`;
    }).reverse().join('');
}

class MessageList extends Block {

    constructor(props: { messages: MessageType[] }) {
        const userId = store.getState().user.id;
        const propsWithMessages = {};
        const {messages} = props;
        for (let i = 0; i < messages.length; i++) {
            propsWithMessages[`${'message_' + messages[i].id}`] = new Message({
                ...messages[i],
                isMine: messages[i].user_id === userId,
            });
        }
        super('ul', {
            ...propsWithMessages,
            attrs: {
                'class': 'message-list'
            }
        });
    }

    setProps(newProps: { messages: MessageType[] }) {
        const messages = newProps.messages || [];
        const propsWithMessages = [];
        const userId = store.getState().user.id;
        for (let i = 0; i < messages.length; i++) {

            propsWithMessages.push({
                [`${'message_' + messages[i].id}`]: new Message({
                    ...messages[i],
                    isMine: messages[i].user_id === userId,
                })
            });
        }
        super.setComponents(propsWithMessages);
        super.setProps(newProps);
    }

    render() {
        const template = getTemplate(this.props.messages);
        return this.compile(template);
    }
}

export default MessageList;
