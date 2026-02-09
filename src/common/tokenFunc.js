export const setToken = (token) => {
    localStorage.setItem('token', token);
}
export const getToken = () => {
    return localStorage.getItem('token');
}
export const removeToken = () => {
    localStorage.removeItem('token');
}
export const setUserLocal = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}
export const getUserLocal = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}