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

    public async addLike(like: ILikeModel): Promise<ILikeModel> {
        const error = like.validateSync();
        if (error) throw new ClientError(StatusCode.BadRequest, error.message);

        return vacation.save();
    }



}

export const likesService = new LikesService();
