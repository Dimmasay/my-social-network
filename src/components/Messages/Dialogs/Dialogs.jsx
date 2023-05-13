import style from './Dialogs.module.scss'
import Dialog from "./Dialog/Dialog";

const Dialogs = (props) => {

    let dialogList = props.dialogs.map(dialog => {
        return (
            <Dialog
                userId={dialog.userId}
                key={dialog.userId}
                photo={dialog.photo}
                userName={dialog.userName}
                userIdMessage={props.userIdMessage}
                userIdLatestMessage={props.userIdLatestMessage}
                activeMode={props.activeMode}
            />

        )
    })

    return (
        <div className={style.body}>
            <div className={style.title}>My Dialogs</div>
            <ul className={style.list}>{dialogList}</ul>
        </div>
    )
}


export default Dialogs