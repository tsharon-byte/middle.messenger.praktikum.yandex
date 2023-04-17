import Block from '../../utils/Block';

class Chat extends Block {
    constructor(props) {
        const currentIx = localStorage.getItem('id') || '1';
        const {id='1'} = props;
        super('li', {
            ...props, attrs: {
                'class': `chat__message ${currentIx === id ? 'chat__message_type_active' : ''}`,
                id: `${'chat_' + id}`
            }
        });
    }

    render() {
        const {name, avatar, lastMessage, time, unreadMessages} = this.props;
        const unread = unreadMessages > 0
            ? `<span class="chat__unread-messages">${unreadMessages}</span>`
            : '';
        const template = `<img class="chat__avatar" src=${avatar}/>
                                  <div class="chat__content">
                                        <span class="chat__name">${name}</span>
                                        <span class="chat__last-message">${lastMessage}</span>
                                  </div>
                                  <div class="chat__right-part">
                                        <time class="chat__time">${time}</time>                                  
                                        ${unread}                               
                                  </div>`;
        return this.compile(template);
    }
}

export default Chat;