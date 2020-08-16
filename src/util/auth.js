export const saveUserToken = (token) => {
    typeof window !== 'undefined' && localStorage.setItem('authToken', token);
}

export const retrieveUserToken = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return token ? token : null
}