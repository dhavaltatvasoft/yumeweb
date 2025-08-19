import {
  CLEAR_USER_INFO,
  IS_USER_LOGIN,
  UPDATE_USER_INFO,
  USER_INFO,
  USER_LANGUAGE,
} from '../actions/ActionList';

const initState = {
  isUserLogin: false,
  userInfo: {},
  userToken: '',
  selectedLanguage:'en',
  authType:''
};

const appReducer = (state = initState, action: {type: any; data: any,authType:any}) => {
  switch (action.type) {
    case IS_USER_LOGIN: {
      return {
        ...state,
        isUserLogin: action.data,
        authType:action.authType
      };
    }

    case USER_INFO: {
      return {
        ...state,
        userInfo: action.data,
      };
    }

    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: {...state.userInfo, ...action.data},
      };

    case USER_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.data,
      };

    case CLEAR_USER_INFO: {
      return {
        ...initState,
      };
    }

    default: {
      return state;
    }
  }
};

export default appReducer;
