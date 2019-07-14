import { AppActionType } from "../action/AppAction";

let defaultState = {
  showFloatButton: true,
  datas: {}
};

const AppReducer = (
  state = defaultState,
  action: {
    type: string;
    datas: any;
    showFloatButton: boolean;
  }
) => {
  switch (action.type) {
    case AppActionType.SET_DATAS:
      return { ...state, datas: { ...action.datas } };
    case AppActionType.VISIBILITY_FLOAT_BUTTON:
      return { ...state, showFloatButton: action.showFloatButton };
    default:
      return state;
  }
};

export default AppReducer;
