import Message from "./Message/Message.tsx";
import MessageForm from "../MessageForm/MessageForm.tsx";
import style from './MessageList.module.scss'
import {useEffect, useRef} from "react";
import {ProfileType} from "../../../redux/profileReducer";
import {DialogType} from "../../../redux/messageReducer";


type MessageListPropsType = {
    userIdLatestMessage: number,
    userIdMessage: number,
    dialogs: DialogType[],
    addMessageAC: () => void,
    profile: ProfileType
}

const MessageList = (props: MessageListPropsType) => {

    let currentDialog = props.dialogs.filter((dialog: DialogType) => dialog.userId === (props.userIdMessage || props.userIdLatestMessage))

    let messageList = currentDialog[0].messages.map((message, key) => {
        return (<Message message={message} profile={props.profile} key={key}/>)
    })

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({block: "end", inline: "nearest"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [currentDialog[0].messages.length]);


    return (
        <div className={style.body}>
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