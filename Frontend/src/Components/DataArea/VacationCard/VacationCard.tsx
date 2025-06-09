import { CalendarCheck, CurrencyDollar, HeartStraight, Info, MapPin, Trash, Pencil } from 'phosphor-react';
import { VacationModel } from "../../../Models/VacationModel";
import { calculate } from "../../../Utils/Calculate";
import "./VacationCard.css";
import { Tooltip } from 'react-tooltip';
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { notify } from '../../../Utils/Notify';
import { useSelector } from 'react-redux';
import { UserModel } from '../../../Models/UserModel';
import { AppState, store } from '../../../Redux/Store';
import { LikeModel } from '../../../Models/LikeModel';

type VacationCardProps = {
    vacation: VacationModel;
    // likes?: number;
    deleteCard?: (_id: string) => void,
    editCard?: (vacation: VacationModel) => void
};

export function VacationCard(props: VacationCardProps) {

    const user = useSelector<AppState, UserModel>(store => store.user);
    const userLikes = useSelector<AppState, LikeModel[]>(store => store.likes);

    function didUserLikeVacation(vacation: VacationModel): boolean {
        return userLikes.some(like => like.vacationId === vacation._id);
    }



    const [open, setOpen] = useState(false);

    const { register, handleSubmit } = useForm<VacationModel>({
        defaultValues: {
            destination: props.vacation.destination,
            description: props.vacation.description,
            startDate: calculate.toDateInputValue(props.vacation.startDate),
            endDate: calculate.toDateInputValue(props.vacation.endDate),
            price: props.vacation.price
        }
    });

    function handleEdit(vacation: VacationModel) {
        const start = new Date(vacation.startDate);
        const end = new Date(vacation.endDate);

        if (end <= start) {
            notify.error("End date must be after start date");
            return;
        }

        vacation._id = props.vacation._id;
        props.editCard(vacation);
        setOpen(false);
    }

    function removeCard() {
        props.deleteCard(props.vacation._id);
    }

    const tomorrow = calculate.getTomorrowDate();

    return (
        <div className="Card">
            <div className="ImageContainer">
                <img src={props.vacation.imageUrl} crossOrigin="anonymous"></img>

                {user?.role === 2 && didUserLikeVacation(props.vacation) &&
                    <div className="like-badge-isLiked">
                        <HeartStraight size={18} />
                        <span>{props.vacation.likesCount === 0 ? " " : props.vacation.likesCount}</span>
                    </div>
                }


                {user?.role === 2 && !didUserLikeVacation(props.vacation) && props.vacation.likesCount > 0 &&
                    <div className="like-badge">
                        <HeartStraight size={18} />
                        {<span className='isLiked'>{props.vacation.likesCount === 0 ? " " : props.vacation.likesCount}</span>}
                    </div>
                }

                {user?.role === 2 && !didUserLikeVacation(props.vacation) && props.vacation.likesCount === 0 &&
                    <div className="like-badge">
                        <HeartStraight size={18} />
                    </div>
                }

                <Dialog.Root open={open} onOpenChange={setOpen}>
                    {user?.role === 1 && (
                        <div className="admin-container">
                            <Dialog.Trigger asChild>
                                <div className="edit">
                                    <Pencil size={18} />
                                </div>
                            </Dialog.Trigger>

                            <div className="delete" onClick={removeCard}>
                                <Trash size={18} />
                            </div>

                            <Tooltip anchorSelect=".edit" place="top" content="Edit" delayHide={1} delayShow={200} />
                            <Tooltip anchorSelect=".delete" place="top" content="Delete" delayHide={1} delayShow={200} />
                        </div>
                    )}
                    <Dialog.Portal>
                        <Dialog.Overlay className="dialog-overlay" />
                        <Dialog.Content className="dialog-content">
                            <Dialog.Title className="dialog-title">E d i t   V a c a t i o n</Dialog.Title>
                            <div className='scroll-container'>
                                <Dialog.Description className="dialog-description" />
                                <form onSubmit={handleSubmit(handleEdit)}>
                                    <label>Destination </label>
                                    <input type="text" {...register("destination")} required minLength={2} maxLength={50} />
                                    <label>Start Date </label>
                                    <input type="date" {...register("startDate")} required min={tomorrow} />
                                    <label>End Date </label>
                                    <input type="date" {...register("endDate")} required min={tomorrow} />
                                    <label>Description </label>
                                    <textarea rows={4} className="dialog-textarea" {...register("description")} required minLength={50} maxLength={450} />
                                    <label>Price </label>
                                    <input type="number" step="any" {...register("price")} required min={0.0} max={10000.0} />
                                    <label>Change following image</label>
                                    {props.vacation.imageUrl && (
                                        <div className="preview-image">
                                            <img src={props.vacation.imageUrl} alt="Current Vacation" />
                                        </div>
                                    )}
                                    <input type="file" accept="image/*" {...register("image")} />
                                    <div>
                                        <button className="close-button">S A V E</button>
                                    </div>
                                </form>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>

            </div>
            <div className="scroller-div">
                <div className="destination-container">
                    <MapPin size={22} />
                    <div>{props.vacation.destination}</div>
                </div>
                <div className="destination-container">
                    <CalendarCheck size={22} />
                    <div>{calculate.formatDateRangeAndNights(props.vacation.startDate, props.vacation.endDate)}</div>
                </div>
                <div className="description-container">
                    <Info size={22} />
                    <p className="text">{props.vacation.description}</p>
                </div>
            </div>
            <div className="price-container">
                <CurrencyDollar size={22} />
                <div>{props.vacation.price}</div>
            </div>
        </div>
    );
}
