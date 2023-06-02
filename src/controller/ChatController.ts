import ChatApi from '../api/ChatsApi';
import store from '../utils/Store';

class ChatController {

    public create(data) {
        return ChatApi.create(data).then(data => {
            console.log('save to store', data);
        });
    }

    public getAll() {
        return ChatApi.getAll().then(data => {
            console.log('save to store', data);
            store.set('chats', data);
        });
    }

    public removeChat(chatId: number) {
        return ChatApi.removeChat(chatId).then(data => console.log('save to store', data));
    }

    public requestChatUsers(chatId: number) {
        return ChatApi.requestChatUsers(chatId).then(data => console.log('save to store', data));
    }
}

export default new ChatController();
