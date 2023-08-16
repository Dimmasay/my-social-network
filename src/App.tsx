import style from './App.module.scss';
import {HashRouter, Route, Routes} from "react-router-dom";
import MessagesContainer from "./components/Messages/MessagesContainer.tsx";
import UsersContainer from "./components/Users/UsersContainer.tsx";
import ProfileContainer from "./components/Profile/ProfileContainer.tsx";
import FollowersContainer from "./components/Followers/FollowersContainer.tsx";
import LoginContainer from "./components/Login/LoginContainer.tsx";
import SettingsContainer from "./components/Settings/SettingsContainer.tsx";
import HeaderContainer from "./components/Header/HeaderContainer.tsx";
import {connect} from "react-redux";
import {initializedAppTC} from "./redux/appReducer.ts";
import {useEffect} from "react";
import {DialogType} from "./redux/messageReducer";
import {ProfileType} from "./redux/profileReducer";
import {AppStateType} from "./redux/redux";

type MapStateType = {
    initialized: boolean
}
type MapDispatchType = {
    initializedAppTC: ()=>void
}
type OwnType = {}

type AppPropsType = MapStateType & MapDispatchType & OwnType


const App = (props: AppPropsType) => {

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

let mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized
    }
}
type ConnectType = MapStateType & MapDispatchType & OwnType & AppStateType

export default connect<ConnectType>(mapStateToProps, {initializedAppTC})(App);
