import { LikeObjModel } from "../Models/LikeObjModel";

class Calculate {

    public async getLikesCount(_id: string, likes: LikeObjModel[]): Promise<number> {
        const likeObj = likes.find(obj => obj.vacationId === _id);
        const vacationLikes = likeObj.likes;
        return vacationLikes;
    }

    public formatDateRangeAndNights(startIso: string, endIso: string): string {
        const startDate = new Date(startIso);
        const endDate = new Date(endIso);

        const formatDate = (date: Date): string => {
            const day = String(date.getUTCDate()).padStart(2, '0');
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const year = date.getUTCFullYear();
            return `${day}/${month}/${year}`;
        };

        const formattedStart = formatDate(startDate);
        const formattedEnd = formatDate(endDate);

        const msPerNight = 1000 * 60 * 60 * 24;
        const nights = Math.round((endDate.getTime() - startDate.getTime()) / msPerNight);

        return `${formattedStart} - ${formattedEnd}, ${nights} night${nights !== 1 ? 's' : ''}`;
    }
    public getTomorrowDate(): string {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    public toDateInputValue(dateString: string): string {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().split("T")[0];
    }

    public getLabel(key: string): string {
        switch (key) {
            case "liked":
                return "Liked";
            case "active":
                return "Active Now";
            case "future":
                return "Future";
            case "all":
                return "Display All";
            default:
                return key;
        }
    }
}

export const calculate = new Calculate();