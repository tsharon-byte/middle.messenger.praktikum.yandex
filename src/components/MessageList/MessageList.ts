import store from '../../utils/Store';
import Block from '../../utils/Block';
import './MessageList.css';
import Message from '../Message/Message';


function getTemplate(messages = []) {
    return messages.map(item => {
        return `<li id="${'message_' + item.id}"></li>`;
    }).join('');
}

const onClick = (id) => {
    console.log('click', id);
};

class MessageList extends Block {

    constructor(props) {
        const userId = store.getState().user.id;
        const propsWithMessages = {};
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

    setProps(newProps) {
        const messages = newProps.messages || [];
        const propsWithMessages = [];
        const userId = store.getState().user.id;
        for (const item of messages) {

            propsWithMessages.push({
                [`${'message_' + item.id}`]: new Message({
                    ...item,
                    isMine: item.user_id === userId,
                    events: {'click': () => onClick(item.id)}
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
