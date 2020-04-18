import { AUTH_ERROR, AUTH_LOADING, AUTH_USER } from '../actions/types'

const initialState = {
  user: {
    id: "0",
    name: "testName",
    email: "test@email",
    img: "https://source.unsplash.com/random",
  },
  errorMessage: '',
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, user: action.payload};
    case AUTH_ERROR:
      return {...state, errorMessage: action.payload};
    case AUTH_LOADING:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
}
