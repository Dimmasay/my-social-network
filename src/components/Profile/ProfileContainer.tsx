import style from './Profile.module.scss'

import FollowersPreview from "../Followers/FollowersPreview/FollowersPreview.tsx";
import Posts from "./Posts/Posts.tsx";
import About from "./About/About.tsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
import {connect} from "react-redux";
import {
    addPostAC,
    getProfileTC,
    getStatusTC,
    likePostAC, PostType, ProfileType,
    updateAvatarTC,
    updateStatusTC
} from "../../redux/profileReducer.ts";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {useEffect} from "react";
import {withRouter} from "../../hoc/withRouter";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux";


type MapStateType = {
    profile: ProfileType,
    status: string,
    posts: PostType[]
    myId: number
}
type MapDispatchType = {
    addPostAC: (post: string) => void,
    getProfileTC: (id: number) => void,
    getStatusTC: (id: number) => void,
    updateStatusTC: (myId: number, status: any) => void,
    updateAvatarTC: (myId: number, photo: any) => void,
    likePostAC: (idPost: number) => void,
}
type OwnType = {
    match: {
        userId: string
    }
}

type ProfilePropsType = MapStateType & MapDispatchType & OwnType

const Profile = (props: ProfilePropsType) => {
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
                        photo={props.profile.photos}
                        status={props.status}
                        updateStatusTC={props.updateStatusTC}
                        isOwner={isOwner}
                        updateAvatarTC={props.updateAvatarTC}
                    />
                    <Posts
                        addPostAC={props.addPostAC}
                        likePostAC={props.likePostAC}
                        posts={props.posts}
                        photo={props.profile.photos}
                        fullName={props.profile.fullName}
                    />

                    <About profile={props.profile}/>
                    <FollowersPreview/>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        posts: state.profilePage.posts,
        myId: state.auth.id
    }
}

type ConnectType = MapStateType & MapDispatchType & OwnType & AppStateType

const ProfileContainer = compose(
    connect<ConnectType>(mapStateToProps, {
        addPostAC, getProfileTC, getStatusTC, updateStatusTC, updateAvatarTC, likePostAC
    }),
    withRouter,
    withAuthRedirect
)(Profile)
export default ProfileContainer