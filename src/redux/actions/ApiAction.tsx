import * as type from './ActionList';


// Api integrations
export const isLoading = (value:boolean) => {
  return (dispatch: (arg0: { type: string; data: boolean; }) => void) => {
    dispatch({
      type: type.MAIN_LOADING,
      data: value,
    });
  };
};
