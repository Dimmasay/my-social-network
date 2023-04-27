import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import style from './SettingsContainer.module.scss'
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import React, {useEffect} from "react";
import {getProfileTC, updateProfileTC} from "../../redux/profileReducer";
import Preloader from "../common/Preloader/Preloader";
import {useNavigate} from "react-router-dom";


const Settings = (props) => {
    const navigate = useNavigate()
    useEffect(() => {
        props.getProfileTC(props.myId)
    }, [])

    if (!props.profile || props.profile.userId !== props.myId) {
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

            navigate(`/profile/${props.myId}`)


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
                            <div className={style.titleTitle}>Setting your account</div>
                            <Form className={style.form}>
                                <div className={style.innerWrapper}>
                                    <div className={style.titlePersonal}>Personal information</div>
                                    <div className={style.columnWithError}>
                                        <div className={style.row}>
                                            <label className={style.title} htmlFor="fullNameLabel">Name</label>
                                            <Field
                                                className={errorFullName ? `${style.input} ${style.inputError}` : style.input}
                                                name="fullName"
                                                id='fullNameLabel'/>
                                        </div>
                                        {errorFullName ? <div className={style.errorMessage}>{errors.fullName}</div> : null}
                                    </div>
                                    <div className={style.columnWithError}>
                                        <div className={style.row}>

                                            <label className={style.title} htmlFor="aboutMeLabel">About me</label>
                                            <Field
                                                className={errorAboutMe ? `${style.input} ${style.inputError}` : style.input}
                                                name="aboutMe"
                                                id='aboutMeLabel'/>
                                        </div>
                                        {errorAboutMe ? <div className={style.errorMessage}>{errors.aboutMe}</div> : null}
                                    </div>
                                    <div className={style.row}>
                                        <label className={style.title}
                                               htmlFor="lookingForAJobLabel">Looking for a job</label>
                                        <Field type='checkbox' className={`${style.input} ${style.inputCheckBox}`}
                                               name="lookingForAJob"
                                               id='lookingForAJobLabel'/>
                                    </div>
                                    <div className={`${style.row} ${style.rowJob}`}>
                                        <label className={style.title}
                                               htmlFor="lookingForAJobDescriptionLabel">Looking for a job
                                            description</label>
                                        <Field
                                            as='textarea'
                                            className={`${style.input} ${style.inputArea}`}
                                            name="lookingForAJobDescription"
                                            id='lookingForAJobDescriptionLabel'/>
                                    </div>
                                </div>

                                <div className={style.rowContacts}>
                                    <div className={style.titleContacts}>Contacts</div>
                                    <div className={style.contactList}>
                                        {Object.keys(state.contacts).map(key => {
                                            return (<div className={style.itemContact} key={key}>
                                                <label className={style.title} htmlFor={key}>{key}</label>
                                                <Field className={style.input}
                                                       name={'contacts.' + key}
                                                       id={key}
                                                       placeholder='Enter'
                                                />
                                            </div>)
                                        })}
                                    </div>
                                </div>
                                <button type="submit" className={style.button}>Save</button>

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