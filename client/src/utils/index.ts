export const DateUtil = (date: Date) => {
    return date.toISOString().substring(0, 19).split('T').join(' ');
}