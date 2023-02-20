
let defaultData = {
    isLoading: false
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
    }
    return state;
}

export default dataReducer;