import style from './ProfileInfo.module.scss'
import React, {useEffect, useState} from "react";
import addPhoto from './../../../files/images/icons/camera-add-photo-svgrepo-com.svg'
const ProfileInfo = (props) => {


    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    const activeMode = () => {
        props.isOwner && setStatus(props.status)
        setEditMode(true)
    }
    const saveUpdateStatus = () => {
        props.updateStatusTC(props.myId, status)
        setEditMode(false)
    }

    const updateStatus = (e) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        return () => {
            props.isOwner && setStatus(props.status)
            setEditMode(false)
        }
    }, [props.isOwner])

    return (
        <div className={style.body}>
            <div className={style.banner}>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7QLTj93YGgeuaI2RPFVHu7uLbq_lOGoGeRQ&usqp=CAU'/>
            </div>
            <div className={style.profile}>
                <div className={style.avatar}>
                    <div className={style.image}>
                        <img src={props.photo}/>
                    </div>
                    {props.isOwner ? <FileUploader updateAvatarTC={props.updateAvatarTC} myId={props.myId}/> : null}
                </div>
                <div className={style.info}>
                    <div className={style.header}>
                        <div className={style.name}>{props.fullName}</div>
                        {props.isOwner
                            ? editMode
                                ? <button className={`${style.button} ${style.buttonSave}`}
                                          onClick={saveUpdateStatus}>Save</button>
                                : <button className={`${style.button} ${style.buttonEdit}`} onClick={activeMode}>Edit
                                    status</button>

                            : null}
                    </div>
                {editMode
                    ? <input className={style.input} value={status} onChange={updateStatus}/>
                    : <div className={style.status}>{!!props.status ? props.status : 'Status'}</div>
                }
                </div>

            </div>
        </div>
    )
}


const FileUploader = props => {
    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        props.updateAvatarTC(props.myId, fileUploaded)
    };
    return (
        <div className={style.custom}>
            <div className={style.customButtonAddPhoto} onClick={handleClick}></div>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{display: 'none'}}
            />
        </div>
    );
}


export default ProfileInfo

