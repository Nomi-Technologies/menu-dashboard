export const saveUserToken = (token) => {
    localStorage.setItem('authToken', token);
}

export const retrieveUserToken = () => {
    const token = localStorage.getItem('authToken')
    return token ? token : null
}