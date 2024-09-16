import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { vacationsReducer } from "./VacationsState";
import { followingReducer } from "./FollowingState";

const reducers = combineReducers ({
    vacationsState: vacationsReducer,
    followingState: followingReducer,
    authState: authReducer
})

const store = createStore(reducers);

export default store;