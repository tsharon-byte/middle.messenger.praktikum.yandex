import Message from "./Message";

const Messages = {
    render: ({messages}) => {
        console.log(messages);
        return `<ul class="chat__messages">
                ${messages.map(item => Message.render(item)).join('')}
                </ul>`
    }
}
export default Messages;