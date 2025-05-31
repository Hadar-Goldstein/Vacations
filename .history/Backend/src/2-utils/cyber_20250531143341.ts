import jwt, { SignOptions } from "jsonwebtoken";
import { RoleModel } from "../3-models/role-model";
import { IUserModel } from "../3-models/user-model";
import { appConfig } from "./app-config"; // נניח שמכיל את הסוד

class Cyber {
    // יצירת טוקן JWT
    public getNewToken(user: IUserModel): string {
        // יוצרים עותק של המשתמש ללא הסיסמה
        const { password, ...userWithoutPassword } = user;

        const payload = { user: userWithoutPassword };
        const options: SignOptions = { expiresIn: "3h" };

        const token = jwt.sign(payload, appConfig.jwtSecret, options);

        return token;
    }

    // אימות הטוקן
    public validateToken(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, appConfig.jwtSecret);
            return true;
        } catch (err) {
            return false;
        }
    }

    // בדיקת האם המשתמש הוא מנהל
    public validateAdmin(token: string): boolean {
        try {
            const payload = jwt.verify(token, appConfig.jwtSecret) as { user: IUserModel };
            return payload.user.role === RoleModel.Admin;
        } catch {
            return false;
        }
    }
}

export const cyber = new Cyber();
