import { RoleModel } from "./role-model";

export class CredentialsModel 
{
    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }
}