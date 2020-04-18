import { TEST_INFO, TEST_INFO_ERROR, TEST_INFO_LOADING, TEST_INFO_LIST_ERROR, TEST_INFO_LIST_LOADING, TEST_INFO_LIST } from '../actions/types'

const initialState = {
  testInfo: null,
  testInfoErrorMessage: null,
  testInfoLoading: false,
  testInfoList: [],
  errorMessage: null,
  testInfoListLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TEST_INFO:
      return {...state, testInfo: action.payload};
    case TEST_INFO_ERROR:
      return {...state, testInfoErrorMessage: action.payload};
    case TEST_INFO_LOADING:
      return {...state, testInfoLoading: action.payload};
    case TEST_INFO_LIST:
      return {...state, testInfoList: action.payload};
    case TEST_INFO_LIST_ERROR:
      return {...state, errorMessage: action.payload};
    case TEST_INFO_LIST_LOADING:
      return {...state, testInfoListLoading: action.payload};
    default:
      return state;
  }
}
