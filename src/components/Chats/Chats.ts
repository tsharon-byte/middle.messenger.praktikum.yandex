import Block from '../../utils/Block';
import Chat from '../Chat/Chat';

class Chats extends Block {
    constructor(props: { chats: ChatType[] }) {
        const {chats} = props;
        const onClick = (id) => {
            console.log('click', id);
        };
        const propsWithChats = {};
        for (const item of chats) {
            propsWithChats[`${'chat_' + item.id}`] = new Chat({...item, events: {'click': () => onClick(item.id)}});
        }
        super('ul', {...props, ...propsWithChats, attrs: {'class': 'chat__messages'}});
    }

    render() {
        const {chats} = this.props;
        const template = chats.map(item => `<li id="${'chat_' + item.id}"></li>`).join('');
        return this.compile(template);
    }
}

export default Chats;
