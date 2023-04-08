import style from './PostForm.module.scss'
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';

const PostForm = (props) => {
    let state = {
        postBody: '',
    }

    let addPost = (state) => {
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
                        <div className={style.container}>
                            <div className={style.avatar}>
                                <img
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsc3WLwt1VO_zCe9FTBOByMFq7iya4QO38gA&usqp=CAU'/>
                            </div>
                            {touched.postBody && errors.postBody && <div>{errors.postBody}</div>}
                            <Field as='textarea' className={style.input} name="postBody"/>
                            <button type="submit" className={style.button}>Submit</button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}
export default PostForm