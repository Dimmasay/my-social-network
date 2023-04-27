import style from './MessagesContainer.module.scss'
import {connect} from "react-redux";
import {addMessageAC} from "../../redux/messageReducer";
import Dialogs from "./Dialogs/Dialogs";
import MessageList from "./MessageList/MessageList";
import {compose} from "redux";
import {withRouter} from "../../hoc/withRouter";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {useEffect} from "react";
import {getProfileTC} from "../../redux/profileReducer";

const AllMessages = (props) => {

    useEffect(() => {
        props.getProfileTC(props.myId)
    }, [props.myId])

    let userIdMessage = parseInt(props.match.userId)

    let userIdLatestMessage = props.dialogs.find(dialog => dialog.userId).userId


    return (
        <div className={style.container}>
                <div className={style.dialogsColumn}>
                    <Dialogs dialogs={props.dialogs} userIdMessage={userIdMessage}
                             userIdLatestMessage={userIdLatestMessage}/>
                </div>
                <div className={style.messagesColumn}>
                    {
                        !!userIdMessage
                        ?<MessageList
                                userIdLatestMessage={userIdLatestMessage}
                                userIdMessage={userIdMessage}
                                dialogs={props.dialogs}
                                currentDialogs={props.currentDialogs}
                                addMessageAC={props.addMessageAC}
                                profile={props.profile}
                            />
                            :<div className={style.infoSelect}>Select the desired dialogue</div>
                    }

                </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        dialogs: state.messagePage.dialogs,
        currentDialogs: state.messagePage.currentDialogs,
        myId:state.auth.id,
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