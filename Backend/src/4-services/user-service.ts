import bcrypt from 'bcrypt';
import { IUserModel, UserModel } from '../3-models/user-model';
import { ClientError } from '../3-models/client-error';
import { cyber } from '../2-utils/cyber';
import { StatusCode } from '../3-models/enums';
import { CredentialsModel } from '../3-models/credentials-model';

class UserService {

    public getAllUsers(): Promise<IUserModel[]> {
        return UserModel.find().exec();
    }

    public async emailIsTaken(email: string) :Promise<boolean>{
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return true;
        }
        return false;
    }


    public async register(user: IUserModel): Promise<string> {
        const error = user.validateSync();
        if (error) throw new ClientError(StatusCode.BadRequest, error.message);

        const existingUser = await UserModel.findOne({ email: user.email });
        if (existingUser) {
            throw new ClientError(StatusCode.BadRequest, `Email "${user.email}" is already registered.`);
        }


        user.password = await bcrypt.hash(user.password, 10);
        await user.save();

        const token = cyber.getNewToken(user);
        return token;
    }

    public async login(credentials: CredentialsModel): Promise<string> {
        const user = await UserModel.findOne({ email: credentials.email }).exec();
        if (!user) throw new ClientError(StatusCode.Unauthorized, "Incorrect email or password.");

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) throw new ClientError(StatusCode.Unauthorized, "Incorrect email or password.");

        const token = cyber.getNewToken(user);
        return token;
    }
}

export const userService = new UserService();
