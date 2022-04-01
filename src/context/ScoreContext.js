import createDataContext from './createDataContext';

const ScoreReducer = (state, action) => {
  switch (action.type) {
    case 'add_score':
      return { ...state, playerScore: action.payload };
    case 'clear_score':
      return { ...state, playerScore: action.payload };
    default:
      return state;
  }
};

let storedPlayerScore = localStorage.getItem('score');

const addScore = dispatch => score => {
  dispatch({
    type: 'add_score',
    payload: score,
  });
};

const clearScore = dispatch => () => {
  dispatch({
    type: 'clear_score',
    payload: 0,
  });
};

export const { Provider, Context } = createDataContext(
  ScoreReducer,
  { addScore, clearScore },
  { playerScore: storedPlayerScore ? parseInt(storedPlayerScore) : 0 }
);
