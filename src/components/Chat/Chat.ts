import Block from '../../utils/Block/Block';
import store from '../../utils/Store';
import {timeTransformer} from '../../utils/timeTransformer';
import {transformAvatar} from '../../config/constant';

class Chat extends Block {
    constructor(props: ChatType) {
        const currentIx = store.getState().chat;
        const {id} = props;
        super('li', {
            ...props, attrs: {
                'class': `chat__message ${currentIx === +id ? 'chat__message_type_active' : ''}`,
                id: `${'chat_' + id}`
            }
        });
    }

    render() {
        const {title, avatar, lastMessage, unread_count} = this.props;
        const unread = unread_count > 0
            ? `<span class="chat__unread-messages">${unread_count}</span>`
            : '';
        const content = lastMessage && lastMessage.content ? lastMessage.content : '';
        const template = `<img class="chat__avatar" src=${transformAvatar(avatar)}>
                                  <div class="chat__content">
                                        <span class="chat__name">${title}</span>
                                        <span class="chat__last-message">${content}</span>
                                  </div>
                                  <div class="chat__right-part">
                                        <time class="chat__time">${lastMessage ? timeTransformer(lastMessage.time) : ''}</time>                                  
                                        ${unread}                               
                                  </div>`;
        return this.compile(template);
    }
}

export default Chat;
