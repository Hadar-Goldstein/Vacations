import { ClientError } from "../3-models/client-error";
import { StatusCode } from "../3-models/enums";
import { ILikeModel, LikeModel } from "../3-models/like-model";

class LikesService {

    public async getLikesPerVacation(): Promise<Array<{ vacationId: string, likes: number }>> {
        const likesPerVacation = await LikeModel.aggregate([
            {
                $group: {
                    _id: "$vacationId",
                    likes: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    vacationId: { $toString: "$_id" },
                    likes: 1
                }
            }
        ]);
        return likesPerVacation;
    }

    public async getLikesByUserId(_id: string): Promise<ILikeModel[]> {
        const likes = await LikeModel.find({ userId: _id }).populate("vacation").exec();
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
