import style from './FollowersContainer.module.scss';
import {useEffect} from "react";
import {connect} from "react-redux";
import {followUserTC, setPageAC, setUsersTC, unFollowUserTC, UserType} from "../../redux/userReducer.ts";
import Pagination from "../common/Pagination/Pagination.tsx";
import {NavLink} from "react-router-dom";
import {addDialogAC} from "../../redux/messageReducer.ts";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/redux";

type MapStateFollowersType = {
    users: UserType[],
    page: number,
    count: number,
    totalCount: number,
    inFollowingProcess: number[],
}

type MapDispatchFollowersType = {
    addDialogAC: (userId: number, fullName: string, photo: string) => void,
    followUserTC: (userId: number) => void,
    //setPageAC: () => void,
    setUsersTC: (pageNumber: number, countNumber: number, isFriend: boolean) => void,
    unFollowUserTC: (userId: number) => void,
}

type OwnFollowersType = {  //сюди передаємо типізацію пропсів які передаються через атрибути

}

type FollowersPropsType = MapStateFollowersType & MapDispatchFollowersType & OwnFollowersType // загальні пропси



const Followers: React.FC<FollowersPropsType> = (props) => {


    useEffect(() => {
        props.setUsersTC(props.page, props.count, true)
    }, [props.page, props.count])


    let arrayFollowers = props.users.map(user => {

        return (
            <li key={user.id}>
                <div className={style.itemBody}>
                    <NavLink to={`/profile/${user.id}`} className={style.itemAvatar}>
                        <img
                            src={!!user.photos.small ? user.photos.small : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1r6JLzg7t4O9HLayeMjzvfQ9sSX3xnlbeTg&usqp=CAU'}/>
                    </NavLink>
                    <div className={style.name}>{user.name}</div>
                    {user.followed
                        ? <button
                            disabled={props.inFollowingProcess.some((element: number) => element === user.id)}
                            onClick={() => {
                                props.unFollowUserTC(user.id)
                            }}
                            className={`${style.button} ${style.buttonUnFollow}`}>Unfollow</button>
                        : <button
                            disabled={props.inFollowingProcess.some((element: number) => element === user.id)}
                            onClick={() => {
                                props.followUserTC(user.id)
                            }}
                            className={`${style.button} ${style.buttonFollow}`}>Follow</button>
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
                <Pagination {...props}/>
            </div>
            <ul className={style.list}>
                {arrayFollowers}
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
const FollowersContainer = compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState> - типізуємо connect

    connect<MapStateFollowersType, MapDispatchFollowersType, OwnFollowersType, AppStateType>(mapStateToProps, {
        followUserTC,
        unFollowUserTC,
        setUsersTC,
        setPageAC,
        addDialogAC
    }),
    withAuthRedirect
)(Followers)
export default FollowersContainer