import style from './Message.module.scss'
import {ProfileType} from "../../../../redux/profileReducer";

type MessagePropsType = {
    message: string
    profile: ProfileType
}

const Message = (props: MessagePropsType) => {
    // console.log(props)
    return (
        <li className={style.item}>
            <div className={style.avatar}>
                <img
                    src={!!props.profile
                        ? props.profile.photos.small
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1r6JLzg7t4O9HLayeMjzvfQ9sSX3xnlbeTg&usqp=CAU'}/>

            </div>
            <div className={style.text}>{props.message}</div>
        </li>
    )
}

export default Message