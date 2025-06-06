import { CalendarCheck, CurrencyDollar, HeartStraight, Info, MapPin, Trash, Pencil } from 'phosphor-react';
import { VacationModel } from "../../../Models/VacationModel";
import { calculate } from "../../../Utils/Calculate";
import "./VacationCard.css";
import { Tooltip } from 'react-tooltip';
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from 'react';
import { useForm } from 'react-hook-form';


type VacationCardProps = {
    vacation: VacationModel;
    likes?: number;
    deleteCard?: (_id: string) => void,
    editCard?: (vacation: VacationModel) => void
};

export function VacationCard(props: VacationCardProps) {

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
        vacation._id = props.vacation._id;
        props.editCard(vacation);
        setOpen(false);
    }

    function removeCard() {
        props.deleteCard(props.vacation._id);
    }

    return (
        <div className="Card">
            <div className="ImageContainer">
                <img src={props.vacation.imageUrl} crossOrigin="anonymous"></img>
                {props.likes !== undefined && (
                    <div className="like-badge">
                        <HeartStraight size={18} />
                        <span>Like {props.likes > 0 ? ` ${props.likes}` : ""}</span>
                    </div>

                )}
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    {props.likes === undefined && (
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
                                    <input type="text" {...register("destination")} required />
                                    <label>Start Date </label>
                                    <input type="date" {...register("startDate")} required />
                                    <label>End Date </label>
                                    <input type="date" {...register("endDate")} required />
                                    <label>Description </label>
                                    <textarea rows={4} className="dialog-textarea" {...register("description")} required />
                                    <label>Price </label>
                                    <input type="number" step="any" {...register("price")} required min={0.0} max={10000.0} />
                                    <label>Change following image</label>
                                    {props.vacation.imageUrl && (
                                        <div className="preview-image">
                                            <img src={props.vacation.imageUrl} alt="Current Vacation" />
                                        </div>
                                    )}
                                    <input type="file" accept="image/*" {...register("image")}/>
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
