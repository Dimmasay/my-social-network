import style from './About.module.scss'
import {Link} from "react-router-dom";
import {ProfileType} from "../../../redux/profileReducer";

type AboutType = {
    profile: ProfileType
}

const About = (props: AboutType) => {

    let contacts = Object.keys(props.profile.contacts).map(key => {
        return (<div className={style.itemContact} key={key}>
            <div className={style}>{key} :</div>
            <Link className={style.link} to={props.profile.contacts[key]}>{
                !!props.profile.contacts[key]
                    ? props.profile.contacts[key]
                    : '...'
            }</Link>
        </div>)
    })


    return (
        <div className={style.body}>
            <div className={style.aboutItem}>
                <h2 className={style.aboutTitle}>About me:</h2>
                <div className={style.aboutText}>{props.profile.aboutMe}</div>
            </div>
            <div className={style.jobItem}>
                <h2 className={style.title}>Looking for a job:</h2>
                {
                    props.profile.lookingForAJob
                        ? <div className={style.lookingJobYes}></div>
                        : <div className={style.lookingJobNo}></div>
                }
            </div>
            <div className={style.jobDescrip}>
                <h2 className={style.title}>Looking for a job description:</h2>
                <div className={style.textDescrip}>{props.profile.lookingForAJobDescription}</div>
            </div>
            <div>
                <h3 className={style.titleContacts}>Contacts</h3>
                {contacts}
            </div>
        </div>
    )
}
export default About