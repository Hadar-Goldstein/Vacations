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
        const token = jwt.sign(payload, "TheAmazingClassOf4578-111", options);

        return token;
    }

    public validateToken(token: string) :boolean {
        try{
            if(!token) return false;
            jwt.verify(token, "TheAmazingClassOf4578-111");
            return true;
        }
        catch(err) {
            return false;
        }
    }

    // Validate Admin
    public validateAdmin(token: string) : boolean {
        const payload = jwt.decode(token) as {user: UserModel};
        const user = payload.user;
        return user.roleId === RoleModel.Admin;
    }

    // SHA: Secure Hashing Algorithm
    public hash(plainText: string) : string {
        const hashedText = crypto.createHmac("sha512", appConfig.hashSalt).update(plainText).digest("hex");
        return hashedText;
    }
}

export const cyber = new Cyber();