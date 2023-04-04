import style from './Posts.module.scss'
import PostForm from "./PostForm/PostForm";

const Posts = (props) => {
    let postArray = props.posts.map(post => {
        return (
            <li className={style.item}>
                <div className={style.text}>{post.text}</div>
                <div className={style.likes}>Likes: {post.likes}</div>

            </li>
        )
    })

    return (
        <div className={style.container}>
            <PostForm addPostAC={props.addPostAC}/>
            <div className={style.postContainer}>
                <h2 className={style.title}>My Posts</h2>
                <ul className={style.list}>
                    {postArray}
                </ul>
            </div>
        </div>
    )
}
export default Posts