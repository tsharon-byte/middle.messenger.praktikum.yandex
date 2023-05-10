import Block from '../../utils/Block';
import './Message.css';

class Message extends Block {
    constructor(props:MessageType) {
        const cssClass = `message ${props.isMine ? 'message_type_mine' : ''}`;
        super('li', {
            ...props, attrs: {
                'class': cssClass,
                id: `message_${props.id}`
            },
        });
    }

    render() {
        const template =
            `<div>${this.props.text}</div>
             <div class="message__footer">
                ${this.props.isMine ? '<div class="status"></div>' : ''}
                <span>${this.props.time}</span>
             </div>`;
        return this.compile(template);
    }
}

export default Message;
