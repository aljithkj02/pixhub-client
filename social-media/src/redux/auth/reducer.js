

let token = localStorage.getItem('token') || '';
let id = localStorage.getItem('id') || '';
let name = localStorage.getItem('name') || '';
let isAuth = (token) ? true : false;
let defaultData = {
    isAuth,
    name,
    token,
    id
}

const authReducer = (state = defaultData, action) => {
    if(action.type === 'LOGIN'){
        return {
            ...state,
            isAuth: true,
            name: action.payload.name,
            token: action.payload.token,
            id: action.payload.id
        }
    }else if(action.type === 'LOGOUT'){
        return {
            ...state,
            isAuth: false,
            name: '',
            token: '',
            id: ''
        }
    }
    return state;
}

export default authReducer;