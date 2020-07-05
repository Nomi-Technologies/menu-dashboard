const windowGlobal = typeof window !== 'undefined' && window

export const saveUserToken = (token) => {
    windowGlobal.localStorage.setItem('authToken', token);
}

export const retrieveUserToken = () => {
    const token = windowGlobal.localStorage.getItem('authToken')
    return token ? token : null
}