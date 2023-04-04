import style from './FollowersPreview.module.scss'

const FollowersPreview = (props) => {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <h2 className={style.title}>Followers</h2>
                <button className={style.buttonAll}>See all followers</button>
            </div>
            <div className={style.body}>
                <ul className={style.list}>
                    <li className={style.item}>
                        <div className={style.itemBody}>
                            <div className={style.itemAvatar}>
                                <img src='https://social.webestica.com/assets/images/avatar/03.jpg'/>
                            </div>
                            <div className={style.name}>fullName</div>
                            <div className={style.buttons}>
                                <button className={style.button}>Send message</button>
                                <button className={style.button}>Unfollow</button>
                            </div>
                        </div>
                    </li>
                    <li className={style.item}>
                        <div className={style.itemBody}>
                            <div className={style.itemAvatar}>
                                <img src='https://social.webestica.com/assets/images/avatar/03.jpg'/>
                            </div>
                            <div className={style.name}>fullName</div>
                            <div className={style.buttons}>
                                <button className={style.button}>Send message</button>
                                <button className={style.button}>Unfollow</button>
                            </div>
                        </div>
                    </li>
                    <li className={style.item}>
                        <div className={style.itemBody}>
                            <div className={style.itemAvatar}>
                                <img src='https://social.webestica.com/assets/images/avatar/03.jpg'/>
                            </div>
                            <div className={style.name}>fullName</div>
                            <div className={style.buttons}>
                                <button className={style.button}>Send message</button>
                                <button className={style.button}>Unfollow</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    )
}
export default FollowersPreview