import set from 'lodash/fp/set';
import {
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from '../actions/user';

const userReducer = (user = { data: {}, pending: true }, action) => {
  switch (action.type) {
    case FETCH_USER_PENDING:
      console.log('reducer [FETCH_USER_PENDING]')
      return {
        data: null,
        pending: true
      }
      break;
    case FETCH_USER_SUCCESS:
      console.log('reducer [FETCH_USER_SUCCESS]')
      return {
        data: action.payload,
        pending: false
      }
      break;
    case FETCH_USER_ERROR:
      console.log('reducer [FETCH_USER_ERROR]')
      return user;
      break;
    default:
      return user;
  }
};

export default userReducer;
