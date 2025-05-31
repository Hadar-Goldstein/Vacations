import { RoleModel } from "./role-model";

export class UserModel {
	public _id: string;
	public firstName: string;
	public lastName: string;
	public email: string;
	public password: string;
    public role: RoleModel;
}
