import style from './Dialog.module.scss'
import {NavLink} from "react-router-dom";


const Dialog = (props) => {
    return (
        <li className={style.item}>
            <NavLink to={`/messages/${props.userId}`} className={style.link}>
                <div className={style.avatar}>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1r6JLzg7t4O9HLayeMjzvfQ9sSX3xnlbeTg&usqp=CAU'/>
                </div>
                <div className={style.user}>
                    <div className={style.name}>{props.userName}</div>
                </div>
            </NavLink>
        </li>
    )
}

export default Dialog