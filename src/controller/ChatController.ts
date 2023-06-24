import ChatApi from '../api/ChatsApi';
import store from '../utils/Store';
import {handleError} from '../utils/handleError';

class ChatController {
    constructor() {
        this.getAll = this.getAll.bind(this);
    }

    public create(data: ChatsType) {
        return ChatApi.create(data).then(result => {
            if (!result.reason) {
                console.log('create chat', result);
            } else {
                handleError(result.reason);
            }
        }).catch(handleError);
    }

    public getAll() {
        return ChatApi.getAll().then(chats => {
            if (!chats.reason) {
                store.set('chats', chats);
            }
        }).catch(handleError);
    }

    public removeChat(chatId: number) {
        return ChatApi.removeChat(chatId).then(res => res).catch(handleError);
    }

    public addUser(data: UsersToChatType) {
        return ChatApi.addUsersToChat(data).then(data => console.log('add user to chat result', data)).catch(handleError);
    }

    public removeUser(data: UsersToChatType) {
        return ChatApi.removeUsersFromChat(data).then(data => console.log('removeUser result', data)).catch(handleError);
    }

    public requestChatUsers(chatId: number) {
        return ChatApi.requestChatUsers(chatId).then(data => console.log('request chat users result', data)).catch(handleError);
    }

    public requestMessageToken(chatId: number) {
        return ChatApi.getToken(chatId).then(res => res).catch(handleError);
    }
}

export default new ChatController();
