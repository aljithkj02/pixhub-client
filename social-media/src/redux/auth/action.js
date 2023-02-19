
export const login = (name, id, token) => (dispatch, getState) => {
    localStorage.setItem('name', name);
    localStorage.setItem('id', id);
    return dispatch({
        type: 'LOGIN',
        payload: { name, id, token }
    })
}

export const logout = () => (dispatch, getState) => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    return dispatch({
        type: 'LOGOUT'
    })
}