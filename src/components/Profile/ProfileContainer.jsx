import style from './Profile.module.scss'

import FollowersPreview from "../Followers/FollowersPreview/FollowersPreview";
import Posts from "./Posts/Posts";
import About from "./About/About";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {connect} from "react-redux";
import {addPostAC, getProfileTC, getStatusTC, updateAvatarTC, updateStatusTC} from "../../redux/profileReducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {useEffect} from "react";
import {withRouter} from "../../hoc/withRouter";
import Preloader from "../common/Preloader/Preloader";


const Profile = (props) => {
    let idCurrentProfile = parseInt(props.match.userId)

    let isOwner = (parseInt(props.match.userId) === props.myId)

    useEffect(() => {
        props.getProfileTC(idCurrentProfile)
        props.getStatusTC(idCurrentProfile)
    }, [idCurrentProfile])

    if (!props.profile) {
        return (
            <div className={style.preloader}>
                <Preloader/>
            </div>
        )
    } else {
        return (
            <div className={style.container}>
                <div className={style.row}>
                    <div className={style.columnLeft}>
                        <ProfileInfo
                            myId={props.myId}
                            fullName={props.profile.fullName}
                            photo={props.profile.photos.small}
                            status={props.status}
                            updateStatusTC={props.updateStatusTC}
                            isOwner={isOwner}
                            updateAvatarTC={props.updateAvatarTC}
                        />
                        <Posts addPostAC={props.addPostAC} posts={props.posts}/>
                    </div>
                    <div className={style.columnRight}>
                        <About
                            profile={props.profile}
                        />
                        <FollowersPreview/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        posts: state.profilePage.posts,
        myId: state.auth.id
    }
}

const ProfileContainer = compose(
    connect(mapStateToProps, {
        addPostAC, getProfileTC, getStatusTC, updateStatusTC, updateAvatarTC
    }),
    withRouter,
    withAuthRedirect
)(Profile)
export default ProfileContainer