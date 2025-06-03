class Calculate {
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