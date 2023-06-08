import Block from '../../utils/Block';
import {DEFAULT_AVATAR} from '../../config/config';
import {CURRENT_CHAT_NAME} from '../../config/constant';
import store from '../../utils/Store';

class Chat extends Block {
    constructor(props: ChatType) {
        const currentIx = store.getState()[CURRENT_CHAT_NAME];
        const {id = '1'} = props;
        super('li', {
            ...props, attrs: {
                'class': `chat__message ${currentIx === id ? 'chat__message_type_active' : ''}`,
                id: `${'chat_' + id}`
            }
        });
    }

    render() {
        const {title, avatar, lastMessage, unread_count} = this.props;
        const unread = unread_count > 0
            ? `<span class="chat__unread-messages">${unread_count}</span>`
            : '';
        let time = '';
        if (lastMessage) {
            const t = new Date(lastMessage.time);
            time = t.getHours() + ':' + t.getMinutes();
        }
        const content = lastMessage && lastMessage.content ? lastMessage.content : '';
        const template = `<img class="chat__avatar" src=${avatar || DEFAULT_AVATAR}/>
                                  <div class="chat__content">
                                        <span class="chat__name">${title}</span>
                                        <span class="chat__last-message">${content}</span>
                                  </div>
                                  <div class="chat__right-part">
                                        <time class="chat__time">${time}</time>                                  
                                        ${unread}                               
                                  </div>`;
        return this.compile(template);
    }
}

export default Chat;
