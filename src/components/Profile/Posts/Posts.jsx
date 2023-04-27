import style from './Posts.module.scss'
import PostForm from "./PostForm/PostForm";

const Posts = (props) => {
    let postArray = props.posts.map((post, key) => {
        const likePost = () => {
            props.likePostAC(post.id)
        }

        return (
            <li className={style.item} key={key}>
                <div className={style.header}>
                    <div className={style.photo}>
                        <img src={props.photo}/>
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
        <div className={style.container}>
            <PostForm addPostAC={props.addPostAC} photo={props.photo}/>
            <div className={style.postContainer}>
                <h2 className={style.title}>My Posts</h2>
                <ul className={style.list}>
                    {postArray.reverse()}
                </ul>
            </div>
        </div>
    )
}
export default Posts