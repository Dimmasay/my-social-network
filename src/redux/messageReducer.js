//Action Type


const ADD_MESSAGE = '/messageReducer/ADD_MESSAGE'
const ADD_DIALOG = '/messageReducer/ADD_DIALOG'

const initialState = {
    dialogs: [
        {userName: 'Dima', messages: ['Hello, I`m fine', 'Yes'], userId: 9},
        {userName: 'Tanya', messages: ['Abrakadabra', 'no'], userId: 5},
        {userName: 'Larisa', messages: ['Happy Birthday', 'Hello'], userId: 7},
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
                dialogs: [
                    ...state.dialogs, {
                        userName: action.userName,
                        messages: ['',],
                        userId: action.id
                    }
                ]
            }

        default :
            return state
    }
}

//Action Creators
export const addMessageAC = (id, message) => ({type: ADD_MESSAGE, id, message})
export const addDialogAC = (id, userName) => ({type: ADD_DIALOG, id, userName})


//Thunk Creators
// export const setUsersTC = (page, count, friend) => async (dispatch) => {
//     let data = await usersAPI.getUsers(page, count, friend)
//     dispatch(setUsersAC(data.items))
//     dispatch(setTotalCountAC(data.totalCount))
// }

export default messageReducer