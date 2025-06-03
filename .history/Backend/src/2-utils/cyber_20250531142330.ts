import crypto from "crypto";
import jwt, { SignOptions } from "jsonwebtoken";
import { IUserModel, UserModel } from "../3-models/user-model";
import { RoleModel } from "../3-models/role-model";
import { appConfig } from "./app-config";

class Cyber {
    public getNewToken(user: IUserModel) : string {

        delete user.password;

        const payload = { user };
        const options: SignOptions = {expiresIn: "3h"};

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

    // SHA: Secure Hashing Algorithm
    public hash(plainText: string) : string {
        const hashedText = crypto.createHmac("sha512", appConfig.hashSalt).update(plainText).digest("hex");
        return hashedText;
    }
}

export const cyber = new Cyber();