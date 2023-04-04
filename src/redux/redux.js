import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";
import messageReducer from "./messageReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
    profilePage: profileReducer,
    usersPage: userReducer,
    messagePage: messageReducer,
    auth: authReducer
})




const store = legacy_createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
);

export default store