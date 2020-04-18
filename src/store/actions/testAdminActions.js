import axios from 'axios';

export const testCreate = (test) => {
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: `http://localhost:3000/tests/`,
      data: test
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
