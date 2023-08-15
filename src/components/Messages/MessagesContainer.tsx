import style from './MessagesContainer.module.scss'
import {connect} from "react-redux";
import {addMessageAC, DialogType} from "../../redux/messageReducer.ts";
import Dialogs from "./Dialogs/Dialogs.tsx";
import MessageList from "./MessageList/MessageList.tsx";
import {compose} from "redux";
import {withRouter} from "../../hoc/withRouter";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {useEffect, useState} from "react";
import {getProfileTC, ProfileType} from "../../redux/profileReducer.ts";
import {AppStateType} from "../../redux/redux";



type MapStateType = {
    dialogs: DialogType[]
    match: {
        userId: string
    }
    myId: number
    profile: ProfileType
}
type MapDispatchType = {
    addMessageAC: ()=> void
    getProfileTC: (id: number) => void
}
type OwnType = {}

type AllMessagesPropsType = MapStateType & MapDispatchType & OwnType

const AllMessages = (props: AllMessagesPropsType) => {


    const [isActiveDialogs, setActive] = useState(false)

    useEffect(() => {
        props.getProfileTC(props.myId)
    }, [props.myId])

    let userIdMessage = parseInt(props.match.userId)

    let userIdLatestMessage = props.dialogs.find(dialog => dialog.userId).userId

    const activeMode = (): void => {
        isActiveDialogs ? setActive(false) : setActive(true)
    }

    return (
        <div className={style.body}>
            <div
                className={isActiveDialogs ? ` ${style.dialogsColumnActive} ${style.dialogsColumn}` : `${style.dialogsColumn}`}>
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
const mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.messagePage.dialogs,
        myId: state.auth.id,
        profile: state.profilePage.profile,
    }
}

type ConnectType = MapStateType & MapDispatchType & OwnType & AppStateType

const MessagesContainer = compose(
    connect<ConnectType>(mapStateToProps, {
        addMessageAC,
        getProfileTC,
    }),
    withRouter,
    withAuthRedirect
)(AllMessages)
export default MessagesContainer