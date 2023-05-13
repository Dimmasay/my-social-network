// import style from './UsersContainer.module.scss'
import style from './../Followers/FollowersContainer.module.scss'
import {useEffect} from "react";
import {connect} from "react-redux";
import {followUserTC, setPageAC, setUsersTC, unFollowUserTC} from "../../redux/userReducer";
import Pagination from "../common/Pagination/Pagination";
import {NavLink} from "react-router-dom";


const Users = (props) => {

    useEffect(() => {
        props.setUsersTC(props.page, props.count)

    }, [props.page, props.count])

    let arrayUserOnPage = props.users.map(user => {
        return (
            <li className={style.item} key={user.id}>
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
                            className={`${style.button} ${style.buttonUnFollow}`}>Unfollow</button>
                        : <button
                            disabled={props.inFollowingProcess.includes(user.id)}
                            onClick={() => {
                                props.followUserTC(user.id)
                            }}
                            className={`${style.button} ${style.buttonFollow}`}>Follow</button>
                    }
                </div>
            </li>)
    })

    return (
        <div className={style.container}>
            <div className={style.header}>
                <Pagination {...props}/>
            </div>
            <ul className={style.list}>
                {arrayUserOnPage}
            </ul>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        page: state.usersPage.page,
        count: state.usersPage.count,
        totalCount: state.usersPage.totalCount,
        inFollowingProcess: state.usersPage.inFollowingProcess,
    }
}
const UsersContainer = connect(mapStateToProps, {
    followUserTC,
    unFollowUserTC,
    setUsersTC,
    setPageAC
})(Users)
export default UsersContainer