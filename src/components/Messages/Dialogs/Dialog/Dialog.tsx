import style from './Dialog.module.scss'
import {NavLink} from "react-router-dom";


type DialogPropsType = {
    userId: number,
    key: number,
    photo: string,
    userName: string,
    userIdMessage: number,
    userIdLatestMessage: number,
    activeMode: () => void,
}

const Dialog = (props: DialogPropsType) => {

    return (
        <li className={props.userId === (props.userIdMessage) ? `${style.activeItem} ${style.item}` : `${style.item}`}>
            <NavLink to={`/messages/${props.userId}`} className={style.link} onClick={props.activeMode}>
                <div className={style.avatar}>
                    <img src={
                        !!props.photo
                            ? props.photo
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1r6JLzg7t4O9HLayeMjzvfQ9sSX3xnlbeTg&usqp=CAU'
                    }/>
                </div>
                <div className={style.name}>{props.userName}</div>
            </NavLink>
        </li>
    )
}

export default Dialog