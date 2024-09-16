import { fetchUsersAction, loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import axios from "axios";
import store from "../Redux/Store";
import config from "../Utils/Config";
import UserModel from "../Models/UserModel";
import CredentialsModel from "../Models/CredentialsModel";

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.registerUrl, user);
        const token = response.data;
        store.dispatch(registerAction(token))
    }

    public async login(credentials: CredentialsModel): Promise<void> {        
        const response = await axios.post<string>(config.loginUrl, credentials);
        const token = response.data;                
        store.dispatch(loginAction(token, credentials.username))
    }

    public logout(): void {
        store.dispatch(logoutAction())
    }

    public isLoggedIn(): boolean {
        return store.getState().authState.token !== null;
    }

    public async getAllUsers(): Promise<UserModel[]> {
        let users = store.getState().authState.users;
        if(users.length === 0) {
            const response = await axios.get<UserModel[]>(config.userUrl)
            users = response.data;
            store.dispatch(fetchUsersAction(users))
        }                
        return users;
    }

}

const authService = new AuthService();

export default authService;