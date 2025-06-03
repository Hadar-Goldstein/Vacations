import bcrypt from 'bcrypt';

public async login(credentials: CredentialsModel): Promise<string> {

    const user = await UserModel.findOne({ email: credentials.email }).exec();

    if (!user)
        throw new ClientError(StatusCode.Unauthorized, "Incorrect email or password.");

    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordCorrect)
        throw new ClientError(StatusCode.Unauthorized, "Incorrect email or password.");

    const token = cyber.getNewToken(user);

    return token;
}
