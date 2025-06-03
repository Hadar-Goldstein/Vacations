import bcrypt from 'bcrypt';
import { IUserModel, UserModel } from '../3-models/user-model';
import { ClientError } from '../3-models/client-error';
import { cyber } from '../2-utils/cyber';
import { StatusCode } from '../3-models/enums';
import { CredentialsModel } from '../3-models/credentials-model';

class UserService {

    public async register(user: IUserModel): Promise<string> {
        const error = user.validateSync();
        if (error) throw new ClientError(StatusCode.BadRequest, error.message);

        // הצפנת הסיסמה
        user.password = await bcrypt.hash(user.password, 10);

        // שמירה למסד
        await user.save();

        // יצירת טוקן
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
