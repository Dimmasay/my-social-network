//Action Type


// const ADD_MESSAGE = '/messageReducer/ADD_MESSAGE'
// const ADD_DIALOG = '/messageReducer/ADD_DIALOG'

enum ActionType {
    ADD_MESSAGE = '/messageReducer/ADD_MESSAGE',
    ADD_DIALOG = '/messageReducer/ADD_DIALOG'
}


export type DialogType = {
    userName: string | null,
    photo: string | null,
    messages: string[],
    userId: number
}
export type InitialStateType = {
    dialogs: DialogType[],
}


const initialState: InitialStateType = {
    dialogs: [
        {userName: 'Dima', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1r6JLzg7t4O9HLayeMjzvfQ9sSX3xnlbeTg&usqp=CAU', messages: ['Hello, I`m fine', 'Yes'], userId: 9},
        {userName: 'Tanya', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1r6JLzg7t4O9HLayeMjzvfQ9sSX3xnlbeTg&usqp=CAU', messages: ['Abrakadabra', 'no'], userId: 5},
        {
            userName: 'Larisa',
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1r6JLzg7t4O9HLayeMjzvfQ9sSX3xnlbeTg&usqp=CAU',
            messages: ['Happy Birthday', 'Hello', 'Happy Birthday', 'Hello', 'Happy Birthday', 'Hello', 'Happy Birthday', 'Hello', 'Happy Birthday', 'Hello', 'Happy Birthday', 'Hello', 'Hello', 'Happy Birthday', 'Hello', 'Happy Birthday', 'Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello '],
            userId: 7
        },
    ],


}

type ActionsTypes = AddMessageActionType | AddDialogActionType
const messageReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ActionType.ADD_MESSAGE:
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
        case ActionType.ADD_DIALOG:
            return {
                ...state,
                dialogs: state.dialogs.some(dialog => dialog.userId === action.id)
                    ? [...state.dialogs]
                    : [...state.dialogs, {
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
type AddMessageActionType = {
    type: typeof ActionType.ADD_MESSAGE
    id: number,
    message: string
}
export const addMessageAC = (id: number, message: string): AddMessageActionType => ({type: ActionType.ADD_MESSAGE, id, message})

type AddDialogActionType = {
    type: typeof ActionType.ADD_DIALOG
    id: number,
    userName :string,
    photo: string
}
export const addDialogAC = (id: number, userName: string, photo: string): AddDialogActionType => ({
    type: ActionType.ADD_DIALOG,
    id,
    userName,
    photo
})


export default messageReducer