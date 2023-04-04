import style from './MessagesContainer.module.scss'
import {connect} from "react-redux";
import {addMessageAC} from "../../redux/messageReducer";
import Dialogs from "./Dialogs/Dialogs";
import MessageList from "./MessageList/MessageList";
import {compose} from "redux";
import {withRouter} from "../../hoc/withRouter";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const AllMessages = (props) => {
    let userIdMessage = parseInt(props.match.userId)

    return (
        <div className={style.container}>
            <div className={style.dialogsColumn}>
                <Dialogs dialogs={props.dialogs}/>
            </div>
            <div className={style.messagesColumn}>
                <MessageList
                    userIdMessage={userIdMessage}
                    dialogs={props.dialogs}
                    currentDialogs={props.currentDialogs}
                    addMessageAC={props.addMessageAC}/>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        dialogs: state.messagePage.dialogs,
        currentDialogs: state.messagePage.currentDialogs
    }
}
const MessagesContainer = compose(
    connect(mapStateToProps, {
        addMessageAC
    }),
    withRouter,
    withAuthRedirect
)(AllMessages)
export default MessagesContainer