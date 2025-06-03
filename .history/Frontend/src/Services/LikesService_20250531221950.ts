import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { LikesModel } from "../Models/LikesModel";
import { LikesSlice } from "../Redux/LikesSlice";

class LikesService {
    public async getAllLikess(): Promise<LikesModel[]> {

        if (store.getState().Likess.length > 0) return store.getState().Likess;
        const response = await axios.get<LikesModel[]>(appConfig.LikessUrl);
        const Likess = response.data;

        // Save in global state
        const action = LikesSlice.actions.initLikess(Likess);
        store.dispatch(action);

        return Likess;
    }

    public async addLikes(Likes: LikesModel): Promise<void> {

        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<LikesModel>(appConfig.LikessUrl, Likes, { headers });
        const dbLikes = response.data;

        // Save in global state
        const action = LikesSlice.actions.AddLikes(dbLikes);
        store.dispatch(action);
    }

    public async deleteLikes(_id: string): Promise<void> {
        await axios.delete(appConfig.LikessUrl + _id);
        const action = LikesSlice.actions.deleteLikes(_id);
        store.dispatch(action);
    }
}

export const likesService = new LikesService();
