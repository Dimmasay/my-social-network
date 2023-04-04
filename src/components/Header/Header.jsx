import {NavLink} from "react-router-dom";
import style from './Header.module.scss'

const setActive = (link) => link.isActive ? `${style.link} ${style.active}` : style.link

const Header = (props) => {
    return (
        <div className={style.header}>
            <nav className={style.container}>
                <ul className={style.list}>
                    <li className={style.item}>
                        <NavLink to='./profile' className={setActive}>
                            My profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='./messages' className={setActive}>
                            Messages
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='./users' className={setActive}>
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='./followers' className={setActive}>
                            Followers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='./settings' className={setActive}>
                            Settings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='./login' className={setActive}>
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Header