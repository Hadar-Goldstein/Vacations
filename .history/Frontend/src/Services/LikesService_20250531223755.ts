import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { LikeModel } from "../Models/LikeModel";
import { likeSlice } from "../Redux/LikesSlice";


class LikesService {
    public async getAllLikes(): Promise<LikeModel[]> {

        if (store.getState().likes.length > 0) return store.getState().likes;
        const response = await axios.get<LikeModel[]>(appConfig.likesUrl);
        const Likes = response.data;

        const action = likeSlice.actions.initLikes(Likes);
        store.dispatch(action);
        return Likes;
    }

    public async addLike(Like: LikeModel): Promise<void> {

        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<LikeModel>(appConfig.likesUrl, Like, { headers });
        const dbLike = response.data;

        const action = likeSlice.actions.AddLike(dbLike);
        store.dispatch(action);
    }

    public async removeLike(_id: string): Promise<void> {
        await axios.delete(appConfig.likesUrl + _id);
        const action = LikeSlice.actions.deleteLike(_id);
        store.dispatch(action);
    }
}

export const likesService = new LikesService();
