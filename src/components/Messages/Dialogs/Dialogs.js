import style from './Dialogs.module.scss'
import Dialog from "./Dialog/Dialog";

const Dialogs = (props) => {

    let dialogList = props.dialogs.map(dialog => {

        return (
            <Dialog userId={dialog.userId} userName={dialog.userName}/>

        )
    })

    return (
        <div className={style.container}>
            <div className={style.title}>My Dialogs</div>
            <ul className={style.list}>{dialogList}</ul>
        </div>
    )
}


export default Dialogs