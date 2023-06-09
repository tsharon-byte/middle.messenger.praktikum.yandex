import Block from '../../utils/Block/Block';
import Chat from '../Chat/Chat';
import store from '../../utils/Store';
import ChatController from '../../controller/ChatController';
import messageController from '../../controller/MessageController';

function getTemplate(chats: ChatsType[]) {
    return chats.map((item: ChatType) => `<li id="${'chat_' + item.id}">${item.id}</li>`).join('');
}

const onClick = (id: number) => {
    messageController.leave();
    store.set('chat', id);
    console.log('onClick', id);
    ChatController.requestMessageToken(id).then(result => {
        const token = result.token;
        messageController.connect({
            userId: store.getState().user.id,
            chatId: id,
            token
        });
        messageController.getMessages({offset: 0});
    });
};

class Chats extends Block {
    constructor(props: { chats: ChatType[] }) {
        const chats = props.chats || [];
        const propsWithChats = {};
        for (const item of chats) {
            propsWithChats[`${'chat_' + item.id}`] = new Chat({...item, events: {'click': () => onClick(+item.id)}});
        }
        super('ul', {...props, ...propsWithChats, attrs: {'class': 'chat__messages'}});
    }

    setProps(newProps: {chats: ChatType[]}) {

        const chats = newProps.chats || [];
        const propsWithChats = [];
        for (const item of chats) {
            propsWithChats.push({
                [`${'chat_' + item.id}`]: new Chat({
                    ...item,
                    events: {'click': () => onClick(+item.id)}
                })
            });
        }
        super.setComponents(propsWithChats);
        super.setProps(newProps);
    }

    render() {
        const chats = this.props.chats || [];
        return this.compile(getTemplate(chats));
    }
}

export default Chats;
