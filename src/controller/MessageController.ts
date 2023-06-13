import store from '../utils/Store';
import {handleError} from '../utils/handleError';

const HOST_WS = 'wss://ya-praktikum.tech/ws';

class MessageController {
    private _ws: WebSocket;
    private _userId: number;
    private _chatId: number;
    private _token: string;
    private _ping: number;

    constructor() {
        this._handleOpen = this._handleOpen.bind(this);
        this._handleMessage = this._handleMessage.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    private _addEvents() {
        this._ws.addEventListener('open', this._handleOpen);
        this._ws.addEventListener('message', this._handleMessage);
        this._ws.addEventListener('error', this._handleError);
        this._ws.addEventListener('close', this._handleClose);
    }

    private _removeEvents() {
        this._ws.removeEventListener('open', this._handleOpen);
        this._ws.removeEventListener('message', this._handleMessage);
        this._ws.removeEventListener('error', this._handleError);
        this._ws.removeEventListener('close', this._handleClose);
    }

    private _handleOpen() {
        this.getMessages({offset: 0});
        this._ping = setInterval(() => {
            this._ws.send('');
        }, 10000);
    }

    private _handleMessage(evt: MessageEvent) {
        try {
            const data = JSON.parse(evt.data);
            if (Array.isArray(data)) {
                if (!data.length) {
                    store.set('messages', []);
                } else {
                    store.set('messages', data);
                }
            } else {
                console.log('Непредвиденная ситуация, необходимо обработать отдельно', data);
            }
        } catch (error) {
            handleError(error);
        }
    }

    private _handleError(evt: ErrorEvent) {
        console.log('💬 _handleError', evt.message);
    }

    private _handleClose(evt: CloseEventInit) {
        this._removeEvents();
        if (evt.wasClean) {
            console.log('Соединение закрыто чисто', 'error');
        } else {
            console.log('Проблемы с подключением', 'error');
        }
        if (evt.code === 1006) {
            this._reconnection();
        }
    }

    private _reconnection() {
        this.connect({
            userId: this._userId,
            chatId: this._chatId,
            token: this._token,
        });
    }

    public connect(options: WebSocketConnectType) {
        this._userId = options.userId;
        this._chatId = options.chatId;
        this._token = options.token;
        this._ws = new WebSocket(`${HOST_WS}/chats/${options.userId}/${options.chatId}/${options.token}`);
        this._addEvents();
    }

    public getMessages(options: WebSocketGetType) {
        if (this._ws.readyState) {
            this._ws.send(JSON.stringify({
                content: options.offset.toString(),
                type: 'get old',
            }));
        }
    }

    public leave() {
        clearInterval(this._ping);
        if (this._ws) {
            this._ws.close();
            this._removeEvents();
        }
    }

    public sendMessage(message: string) {
        console.log('sendMessage', this, message);
        this._ws.send(JSON.stringify({
            content: message,
            type: 'message',
        }));
    }
}

export default new MessageController();
