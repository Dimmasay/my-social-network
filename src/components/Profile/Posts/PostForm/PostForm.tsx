import style from './PostForm.module.scss'
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';

type PostFormPropsType = {
    addPostAC: (post: string) => void
    photo: string
}

const PostForm = (props: PostFormPropsType) => {
    type StateType = {
        postBody: string
    }

    let state: StateType = {
        postBody: '',
    }

    let addPost = (state: StateType) => {
        props.addPostAC(state.postBody);
        state.postBody = '';
    }


    const validationSchema = Yup.object().shape({
        postBody: Yup.string()
            .required('Required'),
    })
    return (
        <Formik
            initialValues={state}
            onSubmit={addPost}
            validationSchema={validationSchema}
        >
            {({errors, touched,}) => {
                return (
                    <Form>
                        <div className={style.body}>
                            <div className={style.avatar}>
                                <img src={props.photo}/>
                            </div>
                            {/*{touched.postBody && errors.postBody && <div>{errors.postBody}</div>}*/}
                            <Field
                                as='textarea'
                                className={style.input}
                                name="postBody"
                                placeholder='Create new post'
                            />
                            <button type="submit" className={style.button}>Add post</button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}
export default PostForm