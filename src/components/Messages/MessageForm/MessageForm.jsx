import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import style from "../../Profile/Posts/PostForm/PostForm.module.scss";

const MessageForm = (props) => {

    let state = {
        message: '',
    }

    let addMessage = (state) => {
        props.addMessageAC(props.userIdMessage, state.message);
        state.message = '';
    }


    const validationSchema = Yup.object().shape({
        message: Yup.string()
            .required('Required'),
    })
    return (
        <Formik
            initialValues={state}
            onSubmit={addMessage}
            validationSchema={validationSchema}
        >
            {({errors, touched,}) => {
                return (
                    <Form>
                        <div className={style.container}>
                            {touched.postBody && errors.postBody && <div>{errors.postBody}</div>}
                            <Field as='textarea' className={style.input} name="message"/>
                            <button type="submit" className={style.button}>Submit</button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default MessageForm