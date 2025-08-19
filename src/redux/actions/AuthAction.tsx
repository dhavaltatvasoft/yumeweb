
import { AUTH_TYPE } from '../../utils/CommonVariable';
import * as type from './ActionList';

export const isUserLogin = (value:any,authType:AUTH_TYPE) => {
  return (dispatch: (arg0: { type: string; data: any; authType: AUTH_TYPE }) => void) => {
    dispatch({type: type.IS_USER_LOGIN, data: value, authType});
  };
};

export const setUserInfo = (value:any) => {
  return (dispatch: (arg0: { type: string; data: any; }) => void) => {
    dispatch({type: type.USER_INFO, data: value});
  };
};

export const updateUserInfo = (data: any) => ({
  type: type.UPDATE_USER_INFO,
  data,
});

export const userLanguage = (data: any) => ({
  type: type.USER_LANGUAGE,
  data,
});

export const clearUserInfo = () => {
  return (dispatch: any) => {
    dispatch({type: type.CLEAR_USER_INFO});
  };
};
