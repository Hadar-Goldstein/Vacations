class Calculate {

    public capitalizedTitle(s: string): string {
        if (!value) return value;
        return value
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

}



export const calculate = new Calculate();