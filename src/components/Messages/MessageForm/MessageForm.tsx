import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import style from "./MessageForm.module.scss";

type MessagePropsType = {
    userIdMessage: number
    addMessageAC: (id: number, message: string) => void
}


const MessageForm = (props:MessagePropsType) => {

    type StateType = {
        message: string
    }

    let state: StateType = {
        message: '',
    }

    let addMessage = (state: StateType) => {
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
                    <Form className={style.body}>
                        {touched.postBody && errors.postBody && <div>{errors.postBody}</div>}
                        <Field as='textarea'
                               className={style.input}
                               name="message"
                               placeholder='Type a message here'
                        />
                        <button
                            type="submit"
                            className={style.button}
                        ></button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default MessageForm