import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const FETCH_STATISTICS_REQUEST = "FETCH_STATISTICS_REQUEST";
export const FETCH_STATISTICS_SUCCESS = "FETCH_STATISTICS_SUCCESS";
export const FETCH_STATISTICS_FAILURE = "FETCH_STATISTICS_FAILURE";

export const fetchStatisticsRequest = () => ({
  type: FETCH_STATISTICS_REQUEST,
});

export const fetchStatisticsSuccess = (data) => ({
  type: FETCH_STATISTICS_SUCCESS,
  payload: data,
});

export const fetchStatisticsFailure = (error) => ({
  type: FETCH_STATISTICS_FAILURE,
  payload: error,
});

export const fetchStatistics = () => async (dispatch) => {
  dispatch(fetchStatisticsRequest());
  try {
    const querySnapshot = await getDocs(collection(db, "statistics"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    dispatch(fetchStatisticsSuccess(data));
  } catch (error) {
    dispatch(fetchStatisticsFailure(error.message));
  }
};
