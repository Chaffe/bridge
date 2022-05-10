const defaultState = {
  isAuth: false,
  balance: 0,
  betSum: 0,
  gameStatus: 'waiting',
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_IS_AUTH':
      return {
        ...state,
        isAuth: action.isAuth,
      };

    case 'SET_BET_SUM':
      return {
        ...state,
        betSum: action.betSum,
      };

    case 'ZEROING_BALANCE':
      return {
        ...state,
        balance: 0,
      };

    case 'INCREMENT_BALANCE':
      return {
        ...state,
        balance: state.balance + action.balance,
      };

    case 'DECREMENT_BALANCE':
      return {
        ...state,
        balance: state.balance - Number(action.balance),
      };

    case 'SET_GAME_STATUS':
      return {
        ...state,
        gameStatus: action.gameStatus,
      };

    default:
      return state;
  }
}

export default reducer;
