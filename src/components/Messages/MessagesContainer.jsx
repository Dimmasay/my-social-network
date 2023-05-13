import style from './MessagesContainer.module.scss'
import {connect} from "react-redux";
import {addMessageAC} from "../../redux/messageReducer";
import Dialogs from "./Dialogs/Dialogs";
import MessageList from "./MessageList/MessageList";
import {compose} from "redux";
import {withRouter} from "../../hoc/withRouter";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {useEffect, useState} from "react";
import {getProfileTC} from "../../redux/profileReducer";

const AllMessages = (props) => {

    const [isActive, setActive] = useState(false)

    useEffect(() => {
        props.getProfileTC(props.myId)
    }, [props.myId])

    let userIdMessage = parseInt(props.match.userId)

    let userIdLatestMessage = props.dialogs.find(dialog => dialog.userId).userId

    const activeMode = () => {
        if (isActive) {
            setActive(false)
        } else {
            setActive(true)
        }
    }

    return (
        <div className={style.container}>
            <div
                className={isActive ? ` ${style.dialogsColumnActive} ${style.dialogsColumn}` : `${style.dialogsColumn}`}>
                <Dialogs dialogs={props.dialogs}
                         userIdMessage={userIdMessage}
                         userIdLatestMessage={userIdLatestMessage}
                         activeMode={activeMode}

                />

            </div>
            <div className={style.messagesColumn}>
                {
                    !!userIdMessage
                        ? <MessageList
                            userIdLatestMessage={userIdLatestMessage}
                            userIdMessage={userIdMessage}
                            dialogs={props.dialogs}
                            currentDialogs={props.currentDialogs}
                            addMessageAC={props.addMessageAC}
                            profile={props.profile}
                        />
                        : <div className={style.infoSelect}>Select the desired dialogue</div>
                }
                <button className={style.buttonDialogs} onClick={activeMode}></button>
            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        dialogs: state.messagePage.dialogs,
        currentDialogs: state.messagePage.currentDialogs,
        myId: state.auth.id,
        profile: state.profilePage.profile,
    }
}
const MessagesContainer = compose(
    connect(mapStateToProps, {
        addMessageAC,
        getProfileTC
    }),
    withRouter,
    withAuthRedirect
)(AllMessages)
export default MessagesContainer