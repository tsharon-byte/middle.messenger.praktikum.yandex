import ChatApi from '../api/ChatsApi';
import store from '../utils/Store';
import {CURRENT_CHAT_NAME} from '../config/constant';

class ChatController {
    constructor() {
        this.getAll = this.getAll.bind(this);
    }

    public create(data) {
        return ChatApi.create(data).then(id => {
            console.log('create chat', id);
        });
    }

    public sendMessage(data) {
        const id = store.getState()[CURRENT_CHAT_NAME];
        if (id) {
            ChatApi.getToken(id).then(result => {
                const token = result.token;
                const user = store.getState().user.id;
                const url = `wss://ya-praktikum.tech/ws/chats/${user}/${id}/${token}`;
                const socket = new WebSocket(url);
                socket.addEventListener('open', () => {
                    console.log('Соединение установлено');

                    socket.send(JSON.stringify({
                        content: data.message,
                        type: 'message',
                    }));
                });

                socket.addEventListener('close', event => {
                    if (event.wasClean) {
                        console.log('Соединение закрыто чисто');
                    } else {
                        console.log('Обрыв соединения');
                    }

                    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
                });

                socket.addEventListener('message', event => {
                    console.log('Получены данные', event.data);
                });

                socket.addEventListener('error', event => {
                    console.log('Ошибка', event.message);
                });
            });
        }
    }

    public getAll() {
        return ChatApi.getAll().then(chats => {
            store.set('chats', chats);
            if (chats.length > 0) {
                store.set(CURRENT_CHAT_NAME, chats[0].id);
            } else {
                store.set(CURRENT_CHAT_NAME, undefined);
            }
        });
    }

    public removeChat(chatId: number) {
        return ChatApi.removeChat(chatId).then(data => console.log('save to store', data));
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
}

export default new ChatController();
