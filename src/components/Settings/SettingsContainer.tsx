import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import style from './SettingsContainer.module.scss'
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import React, {useEffect} from "react";
import {getProfileTC, PostType, ProfileType, setUpdateAC, updateProfileTC} from "../../redux/profileReducer.ts";
import Preloader from "../common/Preloader/Preloader";
import {useNavigate} from "react-router-dom";
import {AppStateType} from "../../redux/redux";

type MapStateType = {
    profile: ProfileType,
    isUpdate: boolean,
    myId: number
}
type MapDispatchType = {
    getProfileTC: (id: number) => void,
    updateProfileTC: (id: number, state: any, onSubmitProps: any) => void,
    setUpdateAC: (value: boolean) => void,
}
type OwnType = {}
type SettingsPropsType = MapStateType & MapDispatchType & OwnType

const Settings = (props: SettingsPropsType) => {

    const navigate = useNavigate()

    useEffect(() => {
        props.getProfileTC(props.myId)
        return () => {
            props.setUpdateAC(false)
        }
    }, [])


    if (!props.profile || props.profile.userId !== props.myId) {
        return (
            <div className={style}><Preloader/></div>
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
        let sendForm = (state, onSubmitProps) => {
            props.updateProfileTC(props.myId, state, onSubmitProps.setStatus)
        }


        const validationSchema = Yup.object().shape({
            fullName: Yup.string()
                .required('Required'),
            aboutMe: Yup.string()
                .required('Required')

        })

        const SuccessUpdate = () => {
            if (props.isUpdate === true) {
                setTimeout(() => {
                    navigate(`/profile/${props.myId}`)
                }, 1000)
                return (
                    <button type="submit" className={style.button}>Saved</button>
                )
            }

        }
        return (
            <Formik
                initialValues={state}
                onSubmit={sendForm}
                validationSchema={validationSchema}
            >
                {({errors, touched, status}) => {

                    let errorFullName = touched.fullName && errors.fullName
                    let errorAboutMe = touched.aboutMe && errors.aboutMe

                    return (
                        <div className={style.container}>
                            <div className={style.titleTitle}>Setting your account</div>
                            <Form className={style.form}>
                                <div className={style.info}>
                                    <div className={style.titlePersonal}>Personal information</div>
                                    <div className={style.row}>
                                        <label className={`${style.title} ${style.titleName}`}
                                               htmlFor="fullNameLabel">Name</label>
                                        {errorFullName ?
                                            <div className={style.errorMessage}>{errors.fullName}</div> :
                                            <div className={style.errorMessage}></div>}
                                        <Field
                                            className={errorFullName ? `${style.input} ${style.inputError}` : style.input}
                                            name="fullName"
                                            id='fullNameLabel'/>
                                    </div>
                                    <div className={style.row}>
                                        <label className={`${style.title} ${style.titleAbout}`}
                                               htmlFor="aboutMeLabel">About me</label>
                                        <div className={style.errorMessage}>{errors.aboutMe}</div>
                                        <Field
                                            className={errorAboutMe ? `${style.input} ${style.inputError}` : style.input}
                                            name="aboutMe"
                                            id='aboutMeLabel'/>
                                    </div>
                                    <div className={style.row}>
                                        <label className={`${style.title} ${style.titleCheckbox}`}
                                               htmlFor="lookingForAJobLabel">Looking for a job</label>
                                        <Field type='checkbox' className={`${style.input} ${style.inputCheckBox}`}
                                               name="lookingForAJob"
                                               id='lookingForAJobLabel'/>
                                    </div>
                                    <div className={`${style.row} ${style.rowJob}`}>
                                        <label className={`${style.title} ${style.titleJob}`}
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

                                <div className={style.infoBlock}>{props.isUpdate ? null : status}</div>
                                {
                                    props.isUpdate
                                        ? <SuccessUpdate/>
                                        : <button type="submit" className={style.button}>Save</button>
                                }
                            </Form>
                        </div>
                    )
                }}
            </Formik>
        )


    }


}
const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        isUpdate: state.profilePage.isUpdate,
        myId: state.auth.id
    }
}
type ConnectType = MapStateType & MapDispatchType & OwnType & AppStateType
const SettingsContainer = compose(
    connect<ConnectType>(mapStateToProps, {
        getProfileTC, updateProfileTC, setUpdateAC
    }),
    withAuthRedirect
)(Settings)
export default SettingsContainer