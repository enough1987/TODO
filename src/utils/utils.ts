
export const toDateInputValue = function(date: Date) {
    const local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0,10);
};

export const capitalizeFirstLetter = function(text: string) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
};