import style from './About.module.scss'
import {Link} from "react-router-dom";

const About = (props) => {


    let contacts = Object.keys(props.profile.contacts).map(key  => {
       return( <div className={style.itemContact} key={key}>
            <div className={style.nameContact}>{key}</div>
            <Link className={style.link}>{props.profile.contacts[key]}</Link>
        </div>)
    })


    return (
        <div className={style.container}>
            <div>
                <div className={style.aboutItem}>
                    <h2 className={style.aboutTitle}>About me</h2>
                    <div className={style.text}>{props.profile.aboutMe}</div>
                </div>
                <div className={style.jobItem}>
                    <h2 className={style.title}>Looking for a job</h2>
                    <div className={style.text}>{
                        props.profile.lookingForAJob
                            ? <div> Yes </div>
                            : <div> No </div>
                    }</div>
                </div>
                <div className={style.jobItem}>
                    <h2 className={style.title}>Looking for a job description</h2>
                    <div className={style.text}>{props.profile.lookingForAJobDescription}</div>
                </div>
                <div>
                    <h3 className={style.titleContacts}>Contacts</h3>
                    {contacts}
                </div>
            </div>
        </div>
    )
}
export default About