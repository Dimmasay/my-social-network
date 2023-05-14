import style from './App.module.scss';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import FollowersContainer from "./components/Followers/FollowersContainer";
import LoginContainer from "./components/Login/LoginContainer";
import SettingsContainer from "./components/Settings/SettingsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {initializedAppTC} from "./redux/appReducer";
import {useEffect, useState} from "react";


const App = (props) => {

       useEffect(() => {
        props.initializedAppTC()
    }, [])

    if (props.initialized) {
        return (
            <HashRouter >
                <div className={style.wrapper} >
                    <HeaderContainer/>
                    <div className={style.main}>
                        <Routes className={style.main}>
                            <Route index element={<LoginContainer/>}/>
                            <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                            <Route path='/messages/:userId?' element={<MessagesContainer/>}/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/followers' element={<FollowersContainer/>}/>
                            <Route path='/settings' element={<SettingsContainer/>}/>
                            <Route path='/login' element={<LoginContainer/>}/>
                        </Routes>
                    </div>


                </div>
            </HashRouter>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}
export default connect(mapStateToProps, {initializedAppTC})(App);
