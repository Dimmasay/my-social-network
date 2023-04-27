import Message from "./Message/Message";
import MessageForm from "../MessageForm/MessageForm";
import style from './MessageList.module.scss'
import {useEffect, useRef} from "react";

const MessageList = (props) => {
    let currentDialog = props.dialogs.filter(dialog => dialog.userId === (props.userIdMessage || props.userIdLatestMessage))

    let messageList = currentDialog[0].messages.map(message => {
        return (<Message message={message} profile={props.profile}/>)
    })

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({block: "end", inline: "nearest"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [currentDialog[0].messages.length]);


    return (
        <div className={style.container}>
            <div className={style.messageContent}>
                {
                    currentDialog[0].messages.length === 0
                        ? <div className={style.infoMessage}>Send first message</div>
                        : <ul className={style.messageList}>
                            {messageList}
                            <div ref={messagesEndRef}/>
                        </ul>
                }


            </div>
            <div className={style.messageForm}>

                <MessageForm
                    userIdMessage={props.userIdMessage}
                    addMessageAC={props.addMessageAC}
                />
            </div>
        </div>

    )
}

export default MessageList