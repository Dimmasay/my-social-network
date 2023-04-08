import style from './LoginContainer.module.scss'
import {connect} from "react-redux";
import {useEffect} from "react";
import LoginForm from "./LoginForm/LoginForm";
import {logInTC, logOutTC, toIdentifyTC} from "../../redux/authReducer";
const Login = (props) => {

    useEffect(() => {
        props.toIdentifyTC()

    }, [props.isAuth])


    return (<div className={style.container}>
        <LoginForm
            logInTC={props.logInTC}
            logOutTC={props.logOutTC}
            isAuth={props.isAuth}
        />
    </div>)
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}
const LoginContainer = connect(mapStateToProps, {logInTC, logOutTC, toIdentifyTC})(Login)
export default LoginContainer