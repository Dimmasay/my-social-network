import style from './App.module.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import FollowersContainer from "./components/Followers/FollowersContainer";
import LoginContainer from "./components/Login/LoginContainer";
import SettingsContainer from "./components/Settings/SettingsContainer";


function App() {
    return (
        <BrowserRouter>
            <div className={style.wrapper}>
                <Header/>
                <div className={style.content}>
                    <Routes>
                        <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                        <Route path='/messages/:userId?' element={<MessagesContainer/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/followers' element={<FollowersContainer/>}/>
                        <Route path='/settings' element={<SettingsContainer/>}/>
                        <Route path='/login' element={<LoginContainer/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
