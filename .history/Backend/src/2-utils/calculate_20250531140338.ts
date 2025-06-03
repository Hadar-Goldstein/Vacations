class Calculate {

    function toTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(" ")
        .filter(word => word.length > 0)
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}


    public capitalizedTitle(value: string): string {
        if (!value) return value;
        return value
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

}



export const calculate = new Calculate();