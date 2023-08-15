import {NavLink} from "react-router-dom";
import style from './Header.module.scss'
import {connect} from "react-redux";
import {logOutTC} from "../../redux/authReducer.ts";
import {AppStateType} from "../../redux/redux";

const setActive = (link) => link.isActive ? `${style.link} ${style.active}` : style.link

type MapStateType = {
    myId: number,
    isAuth: boolean
}

type MapDispatchType = {
    logOutTC: () => void
}

type OwnType = {}

export type HeaderPropsType = MapStateType & MapDispatchType & OwnType

const Header = (props: HeaderPropsType) => {

    let logOut = () => {
        props.logOutTC()
    }

    return (
        <div className={style.header}>
            <nav className={style.container}>
                <ul className={style.list}>
                    <li className={style.item}>
                        <NavLink to={`./profile/${props.myId}`} className={setActive}>
                            <span>My profile</span>
                        </NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink to='./messages' className={setActive}>
                            <span>Messages</span>
                        </NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink to='./users' className={setActive}>
                            <span>Users</span>
                        </NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink to='./followers' className={setActive}>
                            <span>Followers</span>
                        </NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink to='./settings' className={setActive}>
                            <span>Settings</span>
                        </NavLink>
                    </li>
                    <li className={style.item}>
                        {

                            props.isAuth === true
                                ? <button className={style.buttonOut} onClick={logOut}><span>Log Out</span></button>
                                : <NavLink to='./login' className={setActive}>
                                    Login
                                </NavLink>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
}
const mapStateToProps = (state: AppStateType) => {
    return {
        myId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}
const HeaderContainer = connect<MapStateType, MapDispatchType, OwnType, AppStateType>(mapStateToProps, {logOutTC})(Header)
export default HeaderContainer