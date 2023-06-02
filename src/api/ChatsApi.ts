import BaseApi, {getOptions} from './BaseApi';

class ChatsApi extends BaseApi {
    constructor() {
        super({path: '/chats'});
    }

    public create(data: ChatsType) {
        return this.post('/', getOptions(data));
    }

    public getAll() {
        return this.get('/', getOptions());
    }

    public removeChat(chatId: number) {
        return this.delete('/', getOptions({chatId}));
    }

    public getChatSentFiles(chatId: number) {
        return this.get(`/${chatId}/files`, getOptions());
    }

    public getArchivedChats() {
        return this.get('/archive', getOptions());
    }

    public archiveChatById(chatId: number) {
        return this.post('/archive', getOptions({chatId}));
    }

    public unArchiveChatById(chatId: number) {
        return this.post('/unarchive', getOptions({chatId}));
    }

    public getCommonChatWithCommonChatUser(chatId: number) {
        return this.get(`/${chatId}/common`, getOptions());
    }

    public getChatUsers(chatId: number) {
        return this.get(`/${chatId}/users`, getOptions());
    }

    public getNewMessagesCount(chatId: number) {
        return this.get(`/new/${chatId}`, getOptions());
    }

    //TODO: to add binary avatar here
    public uploadChatsAvatar(chatId: number) {
        return this.put('/avatar', getOptions({chatId}));
    }

    public addUsersToChat(data: UsersToChatType) {
        return this.put('/users', getOptions(data));
    }

    public deleteUsersFromChat(data: UsersToChatType) {
        return this.delete('/users', getOptions(data));
    }

    public requestChatUsers(chatId: number) {
        return this.post(`/token/${chatId}`, getOptions());
    }
}

export default new ChatsApi();
