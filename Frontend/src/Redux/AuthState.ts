import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

export class AuthState {
    public token: string = null;
    public user: UserModel = null;
    public users: UserModel[] = [];
    public username: string = null;

    public constructor() {
        this.token = localStorage.getItem("token");
        if(this.token) {
            this.user = (jwtDecode(this.token) as any).user;
        }
    }
}

export enum AuthActionType {
    fetchUsers = "FetchUsers",
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

export function fetchUsersAction(users: UserModel[]): AuthAction {
    const action: AuthAction = {type: AuthActionType.fetchUsers, payload: users};
    return action;
}

export function registerAction(token: string): AuthAction {
    const action: AuthAction = {type: AuthActionType.Register, payload: {"token": token}};
    return action;
}
export function loginAction(token: string, username: string): AuthAction {
    const action: AuthAction = {type: AuthActionType.Login, payload: {"token": token, "username": username}};
    return action;
}
export function logoutAction(): AuthAction {
    const action: AuthAction = {type: AuthActionType.Logout};
    return action;
}

export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = {...currentState};

    switch(action.type) {
        case AuthActionType.Register :
            const newMemberToken = action.payload.token;
            newState.token = newMemberToken
            break
        case AuthActionType.Login:
            const token = action.payload.token;
            const username = action.payload.username;
            newState.token = token
            newState.username = username
            newState.user = (jwtDecode(token) as any).user[0];
            localStorage.setItem("role", (jwtDecode(token) as any).user[0].role)
            localStorage.setItem("id", (jwtDecode(token) as any).user[0].id)
            localStorage.setItem("username", username)
            localStorage.setItem("token", token)
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("id");
            localStorage.removeItem("role");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            break;
        case AuthActionType.fetchUsers:
            newState.users = action.payload;
            break
    }

    return newState;

}

