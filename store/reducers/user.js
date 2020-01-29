const TYPE_USER_CHANGE_DATA = 'TYPE_USER_CHANGE_DATA';

export default function user(state = {}, action) {
  switch(action.type) {
    case TYPE_USER_CHANGE_DATA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}

export function changeUserData(data) {
  return {
    type: TYPE_USER_CHANGE_DATA,
    data
  }
}
