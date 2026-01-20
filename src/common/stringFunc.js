export const stringTrimer = (str) => {
    if(str.length <= 20) return str;
    return str.substring(0, 20) + '...';
}