import style from './LoginContainer.module.scss'
import {connect} from "react-redux";
import {useEffect} from "react";
import LoginForm from "./LoginForm/LoginForm.tsx";
import {logInTC, logOutTC, toIdentifyTC} from "../../redux/authReducer.ts";
import {AppStateType} from "../../redux/redux";

type MapStateType = {
    myId: number,
    isAuth: boolean
}

type MapDispatchType = {
    logInTC: () => void,
    logOutTC: () => void,
    toIdentifyTC: () => void
}

type OwnType = {}

type LoginPropsType = MapStateType & MapDispatchType & OwnType

const Login = (props: LoginPropsType) => {

    useEffect(() => {
        props.toIdentifyTC()
    }, [])


    return (
        <div className={style.body}>
            <LoginForm
                logInTC={props.logInTC}
                logOutTC={props.logOutTC}
                isAuth={props.isAuth}
                myId={props.myId}
            />
        </div>)
}
const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        myId: state.auth.id
    }
}
const LoginContainer = connect<MapStateType, MapDispatchType, OwnType, AppStateType>(mapStateToProps, {
    logInTC,
    logOutTC,
    toIdentifyTC

})(Login)
export default LoginContainer