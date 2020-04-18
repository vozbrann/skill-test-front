import { TEST_UPDATE_ANSWERS, TEST_ERROR, TEST_LOADING, TEST_SET, TEST_TAKEN, TEST_FINISHED_ID, TEST_CREATE } from '../actions/types';

const initialState = {
  test: null,
  testTaken: null,
  selectedAnswers: {},
  errorMessage: '',
  isLoading: false,
  testFinishedId: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TEST_SET:
      return {...state, test: action.payload};
    case TEST_UPDATE_ANSWERS:
      return {...state, selectedAnswers: action.payload};
    case TEST_ERROR:
      return {...state, errorMessage: action.payload};
    case TEST_LOADING:
      return {...state, isLoading: action.payload};
    case TEST_TAKEN:
      return {...state, testTaken: action.payload};
    case TEST_FINISHED_ID:
      return {...state, testFinishedId: action.payload};
    default:
      return state;
  }
}
