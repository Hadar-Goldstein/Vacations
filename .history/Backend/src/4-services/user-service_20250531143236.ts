import bcrypt from 'bcrypt';
import { IUserModel } from '../3-models/user-model';
import { ClientError } from '../3-models/client-error';
import { cyber } from '../2-utils/cyber';
import { StatusCode } from '../3-models/enums';

class UserService {

    public async register(user: IUserModel): Promise<string> {
    const error = user.validateSync();
    if (error) throw new ClientError(StatusCode.BadRequest, error.message);

    user.password = await bcrypt.hash(user.password, 10);

    // שמירה למסד עם await
    await user.save();

    // יצירת טוקן
    const token = cyber.getNewToken(user);
    return token;
}
  
}

export const userService = new UserService();
