
export const loadingOn = () => (dispatch, getState) => {
    return dispatch({
        type: 'LOADING_ON',
        payload: { name, id, token, img }
    })
}

export const loadingOff = () => (dispatch, getState) => {
    return dispatch({
        type: 'LOADING_OFF'
    })
}