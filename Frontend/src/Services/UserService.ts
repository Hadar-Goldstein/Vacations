import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CredentialsModel } from "../Models/CredentialsModel";
import { UserModel } from "../Models/UserModel";
import { store } from "../Redux/Store";
import { userSlice } from "../Redux/UserSlice";
import { appConfig } from "../Utils/AppConfig";
import { tokenHandle } from "../Utils/TokenHandle";

class UserService {

    constructor() {
        const token = localStorage.getItem("token");
        if (!token) return;

        const userContainer = jwtDecode<{ user: UserModel }>(token);
        const dbUser = userContainer.user;
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);
    }

    public async emailIsTaken(email: string): Promise<boolean> {
        const response = await axios.get<boolean>(appConfig.emailValidation + email);
        return response.data;
    }

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user);
        const token = response.data;
        const userContainer = jwtDecode<{ user: UserModel }>(token);
        const dbUser = userContainer.user;
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);

        localStorage.setItem("token", token);
        tokenHandle.scheduleTokenExpirationCheck(token);
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const token = response.data;
        const userContainer = jwtDecode<{ user: UserModel }>(token);
        const dbUser = userContainer.user;
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);
        localStorage.setItem("token", token);
        tokenHandle.scheduleTokenExpirationCheck(token);
    }

    public logout(): void {
        const action = userSlice.actions.logoutUser();
        store.dispatch(action);
        localStorage.removeItem("token");
        tokenHandle.cancelExpirationCheck();
    }
}

export const userService = new UserService();

