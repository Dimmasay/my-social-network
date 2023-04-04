import Message from "./Message/Message";
import MessageForm from "../MessageForm/MessageForm";

const MessageList = (props) => {
    let userIdLatestMessage = props.dialogs.find(dialog => dialog.userId).userId
    let currentDialog = props.dialogs.filter(dialog => dialog.userId === (props.userIdMessage || userIdLatestMessage))

    let messageList = currentDialog[0].messages.map(message => {
        return (<Message message={message}/>)
    })
    return (
        <div>
            <ul>{messageList}</ul>
            <MessageForm
                userIdMessage={props.userIdMessage}
                addMessageAC={props.addMessageAC}/>
        </div>

    )
}

export default MessageList