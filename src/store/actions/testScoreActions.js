import axios from 'axios';
import { TEST_SCORE, TEST_SCORE_ERROR, TEST_SCORE_LOADING, TEST_SCORE_LIST, TEST_SCORE_LIST_ERROR, TEST_SCORE_LIST_LOADING } from '../actions/types'

import {testInfoFetch} from './testInfoActions'

const testScoreSet = testScore => ({
  type: TEST_SCORE,
  payload: testScore
});

const testScoreError = errorMessage => ({
  type: TEST_SCORE_ERROR,
  payload: errorMessage
});

const testScoreLoading = bool => ({
  type: TEST_SCORE_LOADING,
  payload: bool
});

const testScoreListSet = testScoreList => ({
  type: TEST_SCORE_LIST,
  payload: testScoreList
});

const testScoreListError = errorMessage => ({
  type: TEST_SCORE_LIST_ERROR,
  payload: errorMessage
});

const testScoreListLoading = bool => ({
  type: TEST_SCORE_LIST_LOADING,
  payload: bool
});

export const testScoreFetch = (id) => {
  return (dispatch, getState) => {
    dispatch(testScoreLoading(true));
    axios.get(`http://localhost:3000/testTaken/${id}`)
      .then((response) => {
        dispatch(testScoreSet(response.data));
        dispatch(testInfoFetch(response.data.test_id));
        dispatch(testScoreLoading(false));
      })
      .catch((error) => {
        if(error.response) {
          dispatch(testScoreError(error.response.data.errorText));
        } else {
          dispatch(testScoreError("Something went wrong."));
        }
        dispatch(testScoreLoading(false));
      });
  }
};

export const testScoreListFetch = () => {
  return (dispatch, getState) => {
    dispatch(testScoreListLoading(true));
    axios.get(`http://localhost:3000/testTaken/`)
      .then((response) => {
        dispatch(testScoreListSet(response.data));
        dispatch(testScoreListLoading(false));
      })
      .catch((error) => {
        if(error.response) {
          dispatch(testScoreListError(error.response.data.errorText));
        } else {
          dispatch(testScoreListError("Something went wrong."));
        }
        dispatch(testScoreListLoading(false));
      });
  }
};

export const testScorePublic = (id, value) => {
  return (dispatch, getState) => {
    dispatch(testScoreListLoading(true));
    axios.patch(`http://localhost:3000/testTaken/${id}`, {
      public: value
    })
      .then((response) => {
        dispatch(testScoreListFetch());
        dispatch(testScoreListLoading(false));
      })
      .catch((error) => {
        if(error.response) {
          dispatch(testScoreListError(error.response.data.errorText));
        } else {
          dispatch(testScoreListError("Something went wrong."));
        }
        dispatch(testScoreListLoading(false));
      });
  }
};
