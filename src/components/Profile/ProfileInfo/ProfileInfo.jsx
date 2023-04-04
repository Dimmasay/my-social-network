import style from './ProfileInfo.module.scss'

const ProfileInfo = (props) => {


    return (
        <div className={style.container}>
            <div className={style.banner}>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7QLTj93YGgeuaI2RPFVHu7uLbq_lOGoGeRQ&usqp=CAU'/>
            </div>

            <div className={style.profile}>
                <div className={style.avatar}>
                    <img
                        src={props.photo}/>
                </div>
                <div className={style.info}>
                    <div className={style.name}>{props.fullName}</div>
                    <div className={style.status}>{props.status}</div>
                </div>
                <button className={style.buttonEdit}>Edit profile</button>
            </div>
        </div>
    )
}
export default ProfileInfo