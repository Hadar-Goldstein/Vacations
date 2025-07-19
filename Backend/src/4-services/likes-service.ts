import { Types } from "mongoose";
import { ClientError } from "../3-models/client-error";
import { StatusCode } from "../3-models/enums";
import { ILikeModel, LikeModel } from "../3-models/like-model";

class LikesService {

    public async getLikes(): Promise<ILikeModel[]> {
        const likes = await LikeModel.find().populate("vacation").populate("user").exec();
        return likes;
    }

    public async getLikesByUserId(_id: string): Promise<ILikeModel[]> {
        const likes = await LikeModel.find({ userId: new Types.ObjectId(_id) }).exec();
        if (!likes) throw new ClientError(StatusCode.NotFound, `User ${_id} does not exist.`);
        return likes;
    }

    public async addLike(like: ILikeModel): Promise<ILikeModel> {
        const error = like.validateSync();
        if (error) throw new ClientError(StatusCode.BadRequest, error.message);

        return like.save();
    }

    public async removeLike(_id: string): Promise<void> {
        const dbLike = await LikeModel.findByIdAndDelete(_id).exec();
        if (!dbLike) throw new ClientError(StatusCode.NotFound, `Like ${_id} does not exist.`);
    }
}

export const likesService = new LikesService();
