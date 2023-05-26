import ChatApi from '../api/ChatsApi';

class ChatController {

    public create(data) {
        return ChatApi.create(data).then(data => console.log('save to store', data));
    }

    public request() {
        return ChatApi.request().then(data => console.log('save to store', data));
    }

    public removeChat(chatId: number) {
        return ChatApi.removeChat(chatId).then(data => console.log('save to store', data));
    }

    public requestChatUsers(chatId: number) {
        return ChatApi.requestChatUsers(chatId).then(data => console.log('save to store', data));
    }
}

export default ChatController;
