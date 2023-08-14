import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profileReducer.ts";
import userReducer from "./userReducer.ts";
import messageReducer from "./messageReducer.ts";
import authReducer from "./authReducer.ts";
import appReducer from "./appReducer.ts";

const reducers = combineReducers({
    profilePage: profileReducer,
    usersPage: userReducer,
    messagePage: messageReducer,
    auth: authReducer,
    app: appReducer
})




const store = legacy_createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
);

window.store = store
export default store