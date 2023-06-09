import ChatApi from '../api/ChatsApi';
import store from '../utils/Store';

class ChatController {
    constructor() {
        this.getAll = this.getAll.bind(this);
    }

    public create(data) {
        return ChatApi.create(data).then(id => {
            console.log('create chat', id);
        });
    }

    public getAll() {
        return ChatApi.getAll().then(chats => {
            store.set('chats', chats);
        });
    }

    public removeChat(chatId: number) {
        return ChatApi.removeChat(chatId);
    }

    public addUser(data: UsersToChatType) {
        return ChatApi.addUsersToChat(data).then(data => console.log('add user to chat result', data));
    }

    public removeUser(data: UsersToChatType) {
        return ChatApi.removeUsersFromChat(data).then(data => console.log('removeUser result', data));
    }

    public requestChatUsers(chatId: number) {
        return ChatApi.requestChatUsers(chatId).then(data => console.log('save to store', data));
    }

    public requestMessageToken(chatId: number) {
        return ChatApi.getToken(chatId);
    }
}

export default new ChatController();
