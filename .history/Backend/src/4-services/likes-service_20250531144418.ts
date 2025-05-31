
class LikesService {

    public async getLikesPerVacation() {
    const likesPerVacation = await LikeModel.aggregate([
        {
            $group: {
                _id: "$vacationId",
                likes: { $sum: 1 }
            }
        }
    ]);

    return likesPerVacation;
}

}

export const likesService = new LikesService();
