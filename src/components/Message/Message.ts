import Block from '../../utils/Block/Block';
import './Message.css';
import {timeTransformer} from '../../utils/timeTransformer';

class Message extends Block {
    constructor(props: MessageType) {
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
            `<div>${this.props.content}</div>
             <div class="message__footer">
                ${this.props.isMine ? '<div class="status"></div>' : ''}
                <span>${timeTransformer(this.props.time)}</span>
             </div>`;
        return this.compile(template);
    }
}

export default Message;
