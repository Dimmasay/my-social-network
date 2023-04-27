//Action Type


const ADD_MESSAGE = '/messageReducer/ADD_MESSAGE'
const ADD_DIALOG = '/messageReducer/ADD_DIALOG'

const initialState = {
    dialogs: [
        {userName: 'Dima', photo: null, messages: ['Hello, I`m fine', 'Yes'], userId: 9},
        {userName: 'Tanya', photo: null, messages: ['Abrakadabra', 'no'], userId: 5},
        {userName: 'Larisa', photo: null, messages: ['Happy Birthday', 'Hello', 'Happy Birthday', 'Hello', 'Happy Birthday', 'Hello', 'Happy Birthday', 'Hello', 'Happy Birthday', 'Hello', 'Happy Birthday', 'Hello', 'Hello', 'Happy Birthday', 'Hello', 'Happy Birthday', 'Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello '], userId: 7},
    ],


}
const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                dialogs: state.dialogs.map(dialog => {
                    if (dialog.userId === action.id) {
                        return {...dialog, messages: [...dialog.messages, action.message]}
                    } else {
                        return {...dialog}
                    }
                })
            }
        case ADD_DIALOG:
            return {
                ...state,
                dialogs: state.dialogs.some(dialog => dialog.userId === action.id)
                    ?[...state.dialogs]
                    :[...state.dialogs, {
                            userName: action.userName,
                            messages: [],
                            userId: action.id,
                            photo: action.photo
                        }
                    ]

            }

        default :
            return state
    }
}

//Action Creators
export const addMessageAC = (id, message) => ({type: ADD_MESSAGE, id, message})
export const addDialogAC = (id, userName, photo) => ({type: ADD_DIALOG, id, userName, photo})




export default messageReducer