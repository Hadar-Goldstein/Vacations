import { jwtDecode } from "jwt-decode";
import { userService } from "../Services/UserService";
import { notify } from "./Notify";

class TokenHandle {
    private logoutTimer: ReturnType<typeof setTimeout>;

    public isTokenExpired(token: string): boolean {
        if (!token) return true;
        try {
            const { exp } = jwtDecode<{ exp: number }>(token);
            const isExpired = Date.now() >= exp * 1000;
            return isExpired;
        }
        catch (err: any) {
            return true;
        }
    }

    public scheduleTokenExpirationCheck(token: string) {
        if (this.logoutTimer) clearTimeout(this.logoutTimer);

        try {
            const { exp } = jwtDecode<{ exp: number }>(token);
            const expiryTime = exp * 1000 - Date.now();

            if (expiryTime > 0) {
                this.logoutTimer = setTimeout(() => {
                    userService.logout();
                    notify.error("Session expired. Please login again.");
                }, expiryTime);
            }
        } 
        catch {
            userService.logout();
        }
    }

    public cancelExpirationCheck() {
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
}

}

export const tokenHandle = new TokenHandle();
