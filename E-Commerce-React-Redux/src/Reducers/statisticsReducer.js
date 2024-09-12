import {
  FETCH_STATISTICS_REQUEST,
  FETCH_STATISTICS_SUCCESS,
  FETCH_STATISTICS_FAILURE,
} from "../Components/statisticsActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATISTICS_REQUEST:
      return { ...state, loading: true };
    case FETCH_STATISTICS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_STATISTICS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default statisticsReducer;
