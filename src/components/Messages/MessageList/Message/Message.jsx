import style from './Message.module.scss'
const Message = (props) => {




    return (
        <li className={style.item}>
            <div className={style.avatar}>
                <img src={props.profile.photos.small}/>
            </div>
            <div className={style.text}>{props.message}</div>

        </li>
    )
}

export default Message