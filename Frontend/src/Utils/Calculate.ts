class Calculate {

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



}

export const calculate = new Calculate();