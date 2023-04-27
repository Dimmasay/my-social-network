import style from './FollowersPreview.module.scss'
import {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {followUserTC, setPrevFriendsTC, unFollowUserTC} from "../../../redux/userReducer";
import {connect} from "react-redux";
import {addDialogAC} from "../../../redux/messageReducer";

const FollowersPreview = (props) => {
    useEffect(() => {
        props.setPrevFriendsTC(1, 3, true)
    }, [props.inFollowingProcess])


    let arrayFollowers = props.prevFriends.map(user => {
        return (
            <li className={style.item}>
                <div className={style.itemBody}>
                    <NavLink to={`/profile/${user.id}`} className={style.itemAvatar}>
                        <img
                            src={!!user.photos.small ? user.photos.small : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1r6JLzg7t4O9HLayeMjzvfQ9sSX3xnlbeTg&usqp=CAU'}/>
                    </NavLink>
                    <div className={style.name}>{user.name}</div>
                    {user.followed
                        ? <button
                            disabled={props.inFollowingProcess.includes(user.id)}
                            onClick={() => {
                                props.unFollowUserTC(user.id)
                            }}
                            className={style.button}>Unfollow</button>
                        : <button
                            disabled={props.inFollowingProcess.includes(user.id)}
                            onClick={() => {
                                props.followUserTC(user.id)
                            }}
                            className={style.button}>Follow</button>
                    }
                    {user.followed && <NavLink to={`/messages/${user.id}`}
                                               onClick={() => {
                                                   props.addDialogAC(user.id, user.name, user.photos.small)
                                               }}
                                               className={style.buttonMessage}>Send Message</NavLink>
                    }
                </div>
            </li>)
    })


    return (
        <div className={style.container}>
            <div className={style.header}>
                <h3 className={style.title}>My best friends</h3>
                <NavLink to={`/followers/`} className={style.showAll}>Show all friends</NavLink>
            </div>
            <ul className={style.list}>
                {arrayFollowers}
            </ul>
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        prevFriends: state.usersPage.prevFriends,
        inFollowingProcess: state.usersPage.inFollowingProcess
    }
}

const PrevFriendsContainer = connect(mapStateToProps, {
    unFollowUserTC,
    followUserTC,
    addDialogAC,
    setPrevFriendsTC

})(FollowersPreview)
export default PrevFriendsContainer