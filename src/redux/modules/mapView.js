import {
  createAction,
  handleActions
} from 'redux-actions';
import request from 'superagent';

// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_TRENDSDATA = 'RECEIVE_TRENDSDATA';
export const INIT_MAP_STATE = {
  trendsData: [],
};

// ------------------------------------
// Actions
// ------------------------------------
// const searchNews = createAction(SEARCH_NEWS);
const receiveTrendsData = createAction(RECEIVE_TRENDSDATA);

export function requestTrendsData() {
  return (dispatch, getState) => {
    let fetching = progressFetchTrendsData();
    fetching.then(result => {
      if (result) {
        dispatch(receiveTrendsData(result.body));
      }
    });
  };
}

function progressFetchTrendsData() {
  return new Promise((resolve, reject) => {
    const apiUrl = 'http://localhost:3000/api/data';
    request.get(apiUrl).end((err, res) => {
      if (res) {
        resolve(res);
        return;
      }
      if (err) {
        reject(err);
      }
    });
  });
}

// ------------------------------------
// Reducer
// ------------------------------------
const intercomReducer = handleActions({
  RECEIVE_TRENDSDATA: (state, action) => Object.assign({}, state, {
    trendsData: action.payload
  }),
}, INIT_MAP_STATE);

export default intercomReducer;
