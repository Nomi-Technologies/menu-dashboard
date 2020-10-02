export const saveUserToken = (token) => {
    typeof window !== 'undefined' && localStorage.setItem('authToken', token);
}

export const logout = () => {
    typeof window !== 'undefined' && localStorage.removeItem('authToken');

}


export const retrieveUserToken = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return token ? token : null
}