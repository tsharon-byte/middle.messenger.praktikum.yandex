import Block from '../utils/Block';
import MessageForm from '../components/MessageForm/MessageForm';

const messageForm = new MessageForm({});

class ChatPage extends Block {
    constructor(props) {
        super('main', props);
    }

    public render() {
        const template = `${messageForm.getElement().innerHTML}`;
        return this.compile(template);
    }
}

export default ChatPage;