import Chat from "./Chat";

const Chats = {
    render: ({chats}) => {
        return `<ul class="chat__messages">
                ${chats.map(item => Chat.render(item)).join('')}
                </ul>`
    }
}
export default Chats;