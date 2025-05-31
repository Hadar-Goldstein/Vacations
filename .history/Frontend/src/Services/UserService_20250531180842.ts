import { UserModel } from "../Models/UserModel";

class UserService {

    public async register(): Promise<UserModel[]> {
        return null;
    }

    
    //On page refresh load token back
    constructor() {
        const token = localStorage.getItem("token");
        if(!token) return;
        // Extract from token 
        const userContainer = jwtDecode<{user: UserModel}>(token);
        const dbUser = userContainer.user;
        //Dispatch to global state
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);
    }

    public async register(user: UserModel) :Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user);
        const token = response.data;
        const userContainer = jwtDecode<{user: UserModel}>(token);
        const dbUser = userContainer.user;
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);

        localStorage.setItem("token", token);
    }

    public async login(credentials: CredentialsModel) :Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const token = response.data;
        const userContainer = jwtDecode<{user: UserModel}>(token);
        const dbUser = userContainer.user;
        console.log(dbUser);
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);
        localStorage.setItem("token", token);
    }

    public logout() : void {
        const action = userSlice.actions.logoutUser();
        store.dispatch(action);
        localStorage.removeItem("token");
    }

}

export const userService = new UserService();

