import axios from 'axios';
import { TEST_UPDATE_ANSWERS, TEST_ERROR, TEST_LOADING, TEST_SET, TEST_TAKEN, TEST_FINISHED_ID } from '../actions/types'

export const setTestTaken = testTaken => ({
  type: TEST_TAKEN,
  payload: testTaken
});

export const setTestFinishedId = testFinishedId => ({
  type: TEST_FINISHED_ID,
  payload: testFinishedId
});

const testSet = test => ({
  type: TEST_SET,
  payload: test
});

export const updateAnswers = answers => ({
  type: TEST_UPDATE_ANSWERS,
  payload: answers
});

const testError = errorMessage => ({
  type: TEST_ERROR,
  payload: errorMessage
});

const testLoading = bool => ({
  type: TEST_LOADING,
  payload: bool
});

export const testCancel = () => {
  return (dispatch, getState) => {
    dispatch(testLoading(true));
    axios({
      method: 'patch',
      url: `http://localhost:3000/testTaken/${getState().test.testTaken.id}`,
      data: {
        answers: null,
        canceled: true,
      }
    })
      .then((response) => {
        dispatch(setTestFinishedId(getState().test.testTaken.id));
        dispatch(testSet(null));
        dispatch(updateAnswers({}));
        dispatch(testLoading(false));
      })
      .catch((error) => {
        if(error.response) {
          dispatch(testError(error.response.data.errorText));
        } else {
          dispatch(testError("Something went wrong."));
        }
        dispatch(testLoading(false));
      });
  }
};

export const testStart = (id) => {
  return (dispatch, getState) => {
    dispatch(testLoading(true));

    axios({
      method: 'get',
      url: `http://localhost:3000/tests/${id}`,
    })
      .then((getTestResponse) => {
        axios({
          method: 'post',
          url: `http://localhost:3000/testTaken`,
          data: {
            answers: null,
            canceled: false,
            test_id: id,
            user_id: getState().auth.user.id,
            start_time: new Date().getTime(),
            public: false
          }
        })
          .then((postTestTakenResponse) => {
            dispatch(setTestTaken(postTestTakenResponse.data));
            dispatch(testSet(getTestResponse.data));
            dispatch(testLoading(false));
          })
      })
      .catch((error) => {
        if(error.response.statusText) {
          dispatch(testError(error.response.statusText));
        } else {
          dispatch(testError("Something went wrong."));
        }
        dispatch(testLoading(false));
      });
  }
};

export const testSubmit = () => {
  return (dispatch, getState) => {
    dispatch(testLoading(true));
    axios({
      method: 'patch',
      url: `http://localhost:3000/testTaken/${getState().test.testTaken.id}`,
      data: {
        answers: getState().test.selectedAnswers,
        canceled: false,
        score: "80"
      }
    })
      .then((response) => {
        dispatch(setTestFinishedId(getState().test.testTaken.id));
        dispatch(testSet(null));
        dispatch(updateAnswers({}));
        dispatch(testLoading(false));
      })
      .catch((error) => {
        if(error.response) {
          dispatch(testError(error.response.data.errorText));
        } else {
          dispatch(testError("Something went wrong."));
        }
        dispatch(testLoading(false));
      });
  }
};
