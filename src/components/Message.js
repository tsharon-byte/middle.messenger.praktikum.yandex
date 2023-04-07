const Message = {
    render({name, avatar, lastMessage, time, unreadMessages, id}) {
        const currentIx = localStorage.getItem('id') || '1';
        const unread = unreadMessages > 0
            ? `<span class="chat__unread-messages">${unreadMessages}</span>`
            : '';
        return `<li class="chat__message ${currentIx === id ? 'chat__message_type_active' : ''}" id=${'message_' + id}>
                                  <img class="chat__avatar" src=${avatar}/>
                                  <div class="chat__content">
                                        <span class="chat__name">${name}</span>
                                        <span class="chat__last-message">${lastMessage}</span>
                                  </div>
                                  <div class="chat__right-part">
                                        <time class="chat__time">${time}</time>                                  
                                        ${unread}                               
                                  </div>
                            </li>`
    }
}
export default Message;