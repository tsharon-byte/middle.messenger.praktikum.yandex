import store from '../../utils/Store';
import Block from '../../utils/Block';
import './MessageList.css';
import Message from '../Message/Message';


function getTemplate(messages = []) {
    return messages.map(item => {
        return `<li id="${'message_' + item.id}"></li>`;
    }).reverse().join('');
}

const onClick = (id) => {
    console.log('click', id);
};

class MessageList extends Block {

    constructor(props) {
        const userId = store.getState().user.id;
        const propsWithMessages = {};
        const {messages} = props;
        for (let i = 0; i < messages.length; i++) {
            propsWithMessages[`${'message_' + messages[i].id}`] = new Message({
                ...messages[i],
                isMine: messages[i].user_id === userId,
                events: {'click': () => onClick(messages[i].id)}
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
        for (let i = 0; i < messages.length; i++) {

            propsWithMessages.push({
                [`${'message_' + messages[i].id}`]: new Message({
                    ...messages[i],
                    isMine: messages[i].user_id === userId,
                    events: {'click': () => onClick(messages[i].id)}
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
