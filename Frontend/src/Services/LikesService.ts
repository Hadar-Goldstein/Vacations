import axios from "axios";
import { LikeObjModel } from "../Models/LikeObjModel";
import { store } from "../Redux/Store";
import { appConfig } from "../Utils/AppConfig";
import { likeSlice } from "../Redux/LikesSlice";
import { LikeModel } from "../Models/LikeModel";

class LikesService {

    // public async getAllLikes(): Promise<LikeModel[]> {

    //     if (store.getState().likes.length > 0) return store.getState().likes;
    //     const response = await axios.get<LikeModel[]>(appConfig.likesUrl);
    //     const Likes = response.data;

    //     const action = likeSlice.actions.initLikes(Likes);
    //     store.dispatch(action);
    //     return Likes;
    // }

    // public async getLikesPerVacation(): Promise<LikeModel[]> {
        
    //     if (store.getState().likes.length > 0) return store.getState().likes;
    //     const response = await axios.get<LikeModel[]>(appConfig.likesUrl);
    //     const likesPerVacation = response.data;

    //     const action = likeSlice.actions.initLikes(likesPerVacation);
    //     store.dispatch(action);
    //     return likesPerVacation;
    // }


    // public async addLike(Like: LikeModel): Promise<void> {

    //     const response = await axios.post<LikeModel>(appConfig.likesUrl, Like);
    //     const dbLike = response.data;

    //     const action = likeSlice.actions.AddLike(dbLike);
    //     store.dispatch(action);
    // }

    // public async removeLike(_id: string): Promise<void> {
    //     await axios.delete(appConfig.likesUrl + _id);
    //     const action = likeSlice.actions.removeLike(_id);
    //     store.dispatch(action);
    // }
}

export const likesService = new LikesService();
