import axios from 'axios';
import { TEST_INFO, TEST_INFO_ERROR, TEST_INFO_LOADING, TEST_INFO_LIST, TEST_INFO_LIST_ERROR, TEST_INFO_LIST_LOADING } from '../actions/types'

const testInfoSet = testInfo => ({
  type: TEST_INFO,
  payload: testInfo
});

const testInfoError = errorMessage => ({
  type: TEST_INFO_ERROR,
  payload: errorMessage
});

const testInfoLoading = bool => ({
  type: TEST_INFO_LOADING,
  payload: bool
});

const testInfoListSet = testInfoList => ({
  type: TEST_INFO_LIST,
  payload: testInfoList
});

const testInfoListError = errorMessage => ({
  type: TEST_INFO_LIST_ERROR,
  payload: errorMessage
});

const testInfoListLoading = bool => ({
  type: TEST_INFO_LIST_LOADING,
  payload: bool
});

export const testInfoFetch = (id) => {
  return (dispatch, getState) => {
    dispatch(testInfoLoading(true));
    axios.get(`http://localhost:8000/skillful/tests-info/${id}/`)
      .then((response) => {
        dispatch(testInfoSet(response.data));
        dispatch(testInfoLoading(false));
      })
      .catch((error) => {
        if(error.response) {
          dispatch(testInfoError(error.response.data.errorText));
        } else {
          dispatch(testInfoError("Something went wrong."));
        }
        dispatch(testInfoLoading(false));
      });
  }
};

export const testInfoListFetch = () => {
  return (dispatch, getState) => {
    dispatch(testInfoListLoading(true));
    axios.get(`http://localhost:8000/skillful/tests-info/`)
      .then((response) => {
        dispatch(testInfoListSet(response.data));
        dispatch(testInfoListLoading(false));
      })
      .catch((error) => {
        if(error.response) {
          dispatch(testInfoListError(error.response.data.errorText));
        } else {
          dispatch(testInfoListError("Something went wrong."));
        }
        dispatch(testInfoListLoading(false));
      });
  }
};
