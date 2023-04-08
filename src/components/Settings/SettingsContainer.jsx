import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import style from './SettingsContainer.module.scss'
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import React, {useEffect} from "react";
import {getProfileTC, updateProfileTC} from "../../redux/profileReducer";
import Preloader from "../common/Preloader/Preloader";
import {Navigate} from "react-router-dom";


const Settings = (props) => {

    useEffect(() => {
        props.getProfileTC(props.myId)
    }, [props.myId])

    if (!props.profile) {
        return (
            <div className={style.preloader}>
                <Preloader/>
            </div>
        )
    } else {

        let state = {
            aboutMe: props.profile.aboutMe,
            userId: props.myId,
            lookingForAJob: props.profile.lookingForAJob,
            lookingForAJobDescription: props.profile.lookingForAJobDescription,
            fullName: props.profile.fullName,
            contacts: {...props.profile.contacts},
        }
        let sendForm = (state) => {
            props.updateProfileTC(props.myId, state)
            return <Navigate to='/profile'/>
        }

        const validationSchema = Yup.object().shape({

            fullName: Yup.string()
                .required('Required'),
            aboutMe: Yup.string()
                .required('Required')

        })

        return (
            <Formik
                initialValues={state}
                onSubmit={sendForm}
                validationSchema={validationSchema}
            >
                {({errors, touched,}) => {

                    let errorFullName = touched.fullName && errors.fullName
                    let errorAboutMe = touched.aboutMe && errors.aboutMe

                    return (
                        <div className={style.container}>
                            <Form>
                                <div className={style.form}>

                                    <div className={style.row}>
                                        <label className={style.title} htmlFor="fullNameLabel">fullName</label>
                                        <Field
                                            className={errorFullName ?`${style.input} ${style.inputError}` :style.input}
                                            name="fullName"
                                            id='fullNameLabel'/>
                                        {errorFullName ?<div>{errors.fullName}</div> :null}
                                    </div>
                                    <div className={style.row}>
                                        <label className={style.title} htmlFor="aboutMeLabel">aboutMe</label>
                                        <Field
                                            className={errorAboutMe ?`${style.input} ${style.inputError}` :style.input}
                                            name="aboutMe"
                                            id='aboutMeLabel'/>
                                        {errorAboutMe ?<div>{errors.aboutMe}</div> :null}
                                    </div>
                                    <div className={style.row}>
                                        <label className={style.title}
                                               htmlFor="lookingForAJobLabel">lookingForAJob</label>
                                        <Field type='checkbox' className={style.input} name="lookingForAJob"
                                               id='lookingForAJobLabel'/>
                                    </div>
                                    <div className={style.row}>
                                        <label className={style.title}
                                               htmlFor="lookingForAJobDescriptionLabel">lookingForAJobDescription</label>
                                        <Field
                                            as='textarea'
                                            className={style.input}
                                            name="lookingForAJobDescription"
                                            id='lookingForAJobDescriptionLabel'/>
                                    </div>
                                    <div>
                                        <div>Contacts</div>
                                        {Object.keys(state.contacts).map(key => {
                                            return (<div className={style.itemContact} key={key}>
                                                <label className={style.title} htmlFor={key}>{key}</label>
                                                <Field className={style.input} name={'contacts.' + key} id={key}/>
                                            </div>)
                                        })}
                                    </div>
                                    <button type="submit" className={style.button}>Submit</button>
                                </div>
                            </Form>
                        </div>
                    )
                }}
            </Formik>
        )
    }


}
const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        myId: state.auth.id
    }
}
const SettingsContainer = compose(
    connect(mapStateToProps, {
        getProfileTC, updateProfileTC
    }),
    withAuthRedirect
)(Settings)
export default SettingsContainer