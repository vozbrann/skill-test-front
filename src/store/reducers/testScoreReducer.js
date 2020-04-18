import { TEST_SCORE, TEST_SCORE_ERROR, TEST_SCORE_LOADING, TEST_SCORE_LIST, TEST_SCORE_LIST_ERROR, TEST_SCORE_LIST_LOADING } from '../actions/types'

const initialState = {
  testScore: null,
  testScoreErrorMessage: null,
  testScoreLoading: false,
  testScoreList: [],
  testScoreListErrorMessage: null,
  testScoreListLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TEST_SCORE:
      return {...state, testScore: action.payload};
    case TEST_SCORE_ERROR:
      return {...state, testScoreErrorMessage: action.payload};
    case TEST_SCORE_LOADING:
      return {...state, testScoreLoading: action.payload};
    case TEST_SCORE_LIST:
      return {...state, testScoreList: action.payload};
    case TEST_SCORE_LIST_ERROR:
      return {...state, testScoreListErrorMessage: action.payload};
    case TEST_SCORE_LIST_LOADING:
      return {...state, testScoreListLoading: action.payload};
    default:
      return state;
  }
}
