import { AppActionType } from "../action/AppAction";

let defaultState = {
  testNum: 0,
  items: null
};

const AppReducer = (
  state = defaultState,
  action: {
    type: string;
    datas: any;
  }
) => {
  switch (action.type) {
    case AppActionType.SET_DATAS:
      console.log("BACHK_AppReducer");
      return { ...state, items: action.datas };
    default:
      return state;
  }
};

export default AppReducer;
