import style from './Posts.module.scss'
import PostForm from "./PostForm/PostForm.tsx";
import {PostType, ProfilePhotosType} from "../../../redux/profileReducer";

type PostsType = {
    addPostAC: (post: string)=> void,
    likePostAC: (idPost: number) => void,
    posts: PostType[],
    photo: ProfilePhotosType,
    fullName: string,
}

const Posts = (props: PostsType) => {
    let postArray = props.posts.map((post, key) => {
        const likePost = () => {
            props.likePostAC(post.id)
        }

        return (
            <li className={style.item} key={key}>
                <div className={style.header}>
                    <div className={style.photo}>
                        <img src={props.photo.small}/>
                    </div>
                    <div className={style.name}>{props.fullName}</div>
                    <div className={style.likes}>Likes: {post.likes}</div>
                </div>
                <div className={style.text}>{post.text}</div>
                <div className={style.bottom}>
                    <button className={style.button} onClick={likePost}>Like</button>
                </div>
            </li>
        )
    })

    return (
        <div className={style.body}>
            <PostForm addPostAC={props.addPostAC} photo={props.photo.small}/>
            <div className={style.postsList}>
                <h2 className={style.title}>My Posts</h2>
                <ul className={style.list}>
                    {postArray.reverse()}
                </ul>
            </div>
        </div>
    )
}
export default Posts