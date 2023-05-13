import {NavLink} from "react-router-dom";
import style from './Header.module.scss'
import {connect} from "react-redux";
import {logOutTC} from "../../redux/authReducer";

const setActive = (link) => link.isActive ? `${style.link} ${style.active}` : style.link

const Header = (props) => {

    let logOut = () => {
        props.logOutTC()
    }


    return (
        <div className={style.header}>
            <nav className={style.container}>
                <ul className={style.list}>
                    <li className={style.item}>
                        <NavLink to={`./profile/${props.myId}`} className={setActive}>
                            My profile
                        </NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink to='./messages' className={setActive}>
                            Messages
                        </NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink to='./users' className={setActive}>
                            Users
                        </NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink to='./followers' className={setActive}>
                            Followers
                        </NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink to='./settings' className={setActive}>
                            Settings
                        </NavLink>
                    </li>
                    <li className={style.item}>
                        {

                        props.isAuth === true
                        ? <button className={style.buttonOut} onClick={logOut}>Log Out</button>
                            :<NavLink to='./login' className={setActive}>
                                Login
                            </NavLink>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        myId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}
const HeaderContainer = connect(mapStateToProps, {logOutTC})(Header)
export default HeaderContainer