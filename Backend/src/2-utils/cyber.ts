import jwt, { SignOptions } from "jsonwebtoken";
import { RoleModel } from "../3-models/role-model";
import { IUserModel } from "../3-models/user-model";

class Cyber {
    public getNewToken(user: IUserModel): string {
        const userObject = user.toObject();
        delete userObject.password;

        const payload = { user: userObject };
        const options: SignOptions = { expiresIn: "3h" };

        return jwt.sign(payload, "v!c@a#t$i%o^n&s!@#$%^&*()", options);
    }


    public validateToken(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, "v!c@a#t$i%o^n&s!@#$%^&*()");
            return true;
        }
        catch (err) {
            return false;
        }
    }

    // Validate Admin
    public validateAdmin(token: string): boolean {
        const payload = jwt.decode(token) as { user: IUserModel };
        const user = payload.user;
        return user.role === RoleModel.Admin;
    }

}

export const cyber = new Cyber();