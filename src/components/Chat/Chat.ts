import Block from '../../utils/Block';
import {DEFAULT_AVATAR} from '../../config/config';

class Chat extends Block {
    constructor(props: ChatType) {
        const currentIx = localStorage.getItem('id') || '1';
        const {id = '1'} = props;
        super('li', {
            ...props, attrs: {
                'class': `chat__message ${currentIx === id ? 'chat__message_type_active' : ''}`,
                id: `${'chat_' + id}`
            }
        });
    }

    render() {
        const {title, avatar, last_message, time, unread_count} = this.props;
        const unread = unread_count > 0
            ? `<span class="chat__unread-messages">${unread_count}</span>`
            : '';
        const template = `<img class="chat__avatar" src=${avatar || DEFAULT_AVATAR}/>
                                  <div class="chat__content">
                                        <span class="chat__name">${title}</span>
                                        <span class="chat__last-message">${last_message || ''}</span>
                                  </div>
                                  <div class="chat__right-part">
                                        <time class="chat__time">${time || ''}</time>                                  
                                        ${unread}                               
                                  </div>`;
        return this.compile(template);
    }
}

export default Chat;
