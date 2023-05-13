import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import style from './LoginForm.module.scss'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Preloader from "../../common/Preloader/Preloader";

const LoginForm = (props) => {
    const navigate = useNavigate()

    useEffect(()=>{
        if(props.isAuth === true) {
            setTimeout(() => {
                navigate(`/profile/${props.myId}`)
            }, 1000)
        }
    }, [props.isAuth])



    let state = {
        email: '',
        password: '',
        rememberMe: false
    }

    let sendForm = (state) => {
        props.logInTC(state)
    }
    let logOut = () => {
        props.logOutTC()
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    })

    return (
        <Formik
            initialValues={state}
            onSubmit={sendForm}
            validationSchema={validationSchema}
        >
            {({errors, touched,}) => {
                return (
                    <div className={style.body}>
                        {props.isAuth
                            ? <div className={style.authImage}>
                                <Preloader/>
                            </div>
                            : <Form>
                                <div className={style.form}>
                                    {touched.postBody && errors.postBody && <div>{errors.postBody}</div>}
                                    <div className={style.row}>
                                        <label className={style.title} htmlFor="loginLabel">Email</label>
                                        <Field className={style.input} name="email" id='loginLabel'/>
                                    </div>
                                    <div className={style.row}>
                                        <label className={style.title} htmlFor="passwordLabel">Password</label>
                                        <Field className={style.input} name="password" id='passwordLabel'
                                               type='password'/>
                                    </div>
                                    <div className={style.row}>
                                        <label className={style.title} htmlFor="rememberMeLabel">Remember Me</label>
                                        <Field className={style.checkboxInput} name="rememberMe" id='rememberMeLabel'
                                               type='checkbox'/>
                                    </div>
                                    <button type="submit" className={style.button}>Submit</button>
                                </div>
                            </Form>}
                        {/*<div>*/}
                        {/*    <button className={style.buttonOut} onClick={logOut}>Log Out</button>*/}
                        {/*</div>*/}
                    </div>
                )
            }}
        </Formik>
    )
}

export default LoginForm