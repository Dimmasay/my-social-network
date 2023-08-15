// import style from './UsersContainer.module.scss'
import style from './../Followers/FollowersContainer.module.scss'
import {useEffect} from "react";
import {connect} from "react-redux";
import {followUserTC, setPageAC, setUsersTC, unFollowUserTC, UserType} from "../../redux/userReducer.ts";
import Pagination from "../common/Pagination/Pagination.tsx";
import {NavLink} from "react-router-dom";
import {ProfileType} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/redux";

type MapStateType = {
    users: UserType[],
    page: number,
    count: number,
    totalCount: number,
    inFollowingProcess: number[],
}
type MapDispatchType = {
    followUserTC: (id: number) => void,
    unFollowUserTC: (id: number) => void,
    setUsersTC: (page: number, count: number) => void,
    setPageAC: () => void,
}
type OwnType = {}
type UsersPropsType = MapStateType & MapDispatchType & OwnType


const Users = (props: UsersPropsType) => {

    useEffect(() => {
        props.setUsersTC(props.page, props.count)

    }, [props.page, props.count])

    let arrayUserOnPage = props.users.map(user => {
        return (
            <li className={style} key={user.id}>
                <div className={style.itemBody}>
                    <NavLink to={`/profile/${user.id}`} className={style.itemAvatar}>
                        <img
                            src={!!user.photos.small ? user.photos.small : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1r6JLzg7t4O9HLayeMjzvfQ9sSX3xnlbeTg&usqp=CAU'}/>
                    </NavLink>
                    <div className={style.name}>{user.name}</div>
                    {user.followed
                        ? <button
                            disabled={props.inFollowingProcess.some((value) => value === user.id)}
                            onClick={() => {
                                props.unFollowUserTC(user.id)
                            }}
                            className={`${style.button} ${style.buttonUnFollow}`}>Unfollow</button>
                        : <button
                            disabled={props.inFollowingProcess.some((value) => value === user.id)}
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
const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        page: state.usersPage.page,
        count: state.usersPage.count,
        totalCount: state.usersPage.totalCount,
        inFollowingProcess: state.usersPage.inFollowingProcess,
    }
}

type ConnectType = MapStateType & MapDispatchType & OwnType & AppStateType
const UsersContainer = connect<ConnectType>(mapStateToProps, {
    followUserTC,
    unFollowUserTC,
    setUsersTC,
    setPageAC
})(Users)
export default UsersContainer