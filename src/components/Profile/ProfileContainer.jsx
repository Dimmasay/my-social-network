import style from './Profile.module.scss'

import FollowersPreview from "../Followers/FollowersPreview/FollowersPreview";
import Posts from "./Posts/Posts";
import About from "./About/About";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {connect} from "react-redux";
import {
    addPostAC,
    getProfileTC,
    getStatusTC,
    likePostAC,
    updateAvatarTC,
    updateStatusTC
} from "../../redux/profileReducer.ts";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {useEffect} from "react";
import {withRouter} from "../../hoc/withRouter";
import Preloader from "../common/Preloader/Preloader";


const Profile = (props) => {
    let idCurrentProfile = parseInt(props.match.userId) || props.myId

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
            <div className={style.mainContainer}>
                <div className={style.body}>
                        <ProfileInfo
                            myId={props.myId}
                            userId={props.profile.userId}
                            fullName={props.profile.fullName}
                            photo={props.profile.photos.small}
                            status={props.status}
                            updateStatusTC={props.updateStatusTC}
                            isOwner={isOwner}
                            updateAvatarTC={props.updateAvatarTC}
                        />
                        <Posts
                            addPostAC={props.addPostAC}
                            likePostAC={props.likePostAC}
                            posts={props.posts}
                            photo={props.profile.photos.small}
                            fullName={props.profile.fullName}
                        />

                        <About  profile={props.profile}/>
                        <FollowersPreview/>

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
        addPostAC, getProfileTC, getStatusTC, updateStatusTC, updateAvatarTC, likePostAC
    }),
    withRouter,
    withAuthRedirect
)(Profile)
export default ProfileContainer