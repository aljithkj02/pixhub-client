
let defaultData = {
    isLoading: false,
    name: '',
    city: '',
    website: ''
}

const dataReducer = (state = defaultData, action) => {
    if(action.type === 'LOADING_ON'){
        return {
            ...state,
            isLoading: true
        }
    }else if(action.type === 'LOADING_OFF'){
        return {
            ...state,
            isLoading: false
        }
    }else if(action.type === 'USER_INFO'){
        return {
            ...state,
            ...action.payload
        }
    }
    return state;
}

export default dataReducer;