import jwt, { SignOptions } from "jsonwebtoken";
import { RoleModel } from "../3-models/role-model";
import { IUserModel } from "../3-models/user-model";

class Cyber {
    public getNewToken(user: IUserModel) : string {

        delete user.password;

        const payload = { user };
        const options: SignOptions = {expiresIn: "5s"};

        // Token
        const token = jwt.sign(payload, "v!c@a#t$i%o^n&s!@#$%^&*()", options);

        return token;
    }

    public validateToken(token: string) :boolean {
        try{
            if(!token) return false;
            jwt.verify(token, "v!c@a#t$i%o^n&s!@#$%^&*()");
            return true;
        }
        catch(err) {
            return false;
        }
    }

    // Validate Admin
    public validateAdmin(token: string) : boolean {
        const payload = jwt.decode(token) as {user: IUserModel};
        const user = payload.user;
        return user.role === RoleModel.Admin;
    }

}

export const cyber = new Cyber();