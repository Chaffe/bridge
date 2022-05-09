const defaultState = {
    isAuth: false,
    balance: 0
}

function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_IS_AUTH':
            return {
                ...state,
                isAuth: action.isAuth
            }

        default:
            return state;
    }
}

export default reducer;