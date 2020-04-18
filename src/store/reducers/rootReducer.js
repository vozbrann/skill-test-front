import authReducer from './authReducer';
import testReducer from './testReducer';
import testInfoReducer from './testInfoReducer';
import testScoreReducer from './testScoreReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  test: testReducer,
  testInfo: testInfoReducer,
  testScore: testScoreReducer
});

export default rootReducer;
