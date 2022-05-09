const defaultState = {
    isAuth: false,
    balance: 0,
    gameStatus: 'waiting'
}

function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_IS_AUTH':
            return {
                ...state,
                isAuth: action.isAuth
            };

        case 'INCREMENT_BALANCE':
            console.log(state, action)
            return {
                ...state,
                balance: Number(state.balance) + Number(action.balance)
            };

        case 'DECREMENT_BALANCE':
            console.log(state, action)
            return {
                ...state,
                balance: Number(state.balance) - Number(action.balance)
            };

        case 'SET_GAME_STATUS':
            return {
                ...state,
                gameStatus: action.gameStatus
            }

        default:
            return state;
    }
}

export default reducer;