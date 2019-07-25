import { AppActionType } from "../action/AppAction";
import DaySchedule from "../../model/DaySchedule";

let defaultState = {
  showFloatButton: true,
  datas: {},
  daySchedules: []
};

const AppReducer = (
  state = defaultState,
  action: {
    type: string;
    datas: any;
    showFloatButton: boolean;
    daySchedules: Array<DaySchedule>;
    daySchedule: DaySchedule;
    oldDaySchedule: DaySchedule;
  }
) => {
  switch (action.type) {
    case AppActionType.SET_DATAS:
      return { ...state, datas: { ...action.datas } };
    case AppActionType.VISIBILITY_FLOAT_BUTTON:
      return { ...state, showFloatButton: action.showFloatButton };
    case AppActionType.SET_LIST_DAYSCHEDULE:
      return { ...state, daySchedules: action.daySchedules };
    case AppActionType.UPDATE_LIST_DAYSCHEDULE:
      return {
        ...state,
        daySchedules: state.daySchedules.map(item => {
          if (
            item.id == action.oldDaySchedule.id &&
            item.databaseKey == action.oldDaySchedule.databaseKey
          ) {
            return action.daySchedule;
          }
          return item;
        })
      };
    case AppActionType.ADD_DAYSCHEDULE:
      return {
        ...state,
        daySchedules: [...state.daySchedules, action.daySchedule]
      };
    case AppActionType.DELETE_DAYSCHEDULE:
      return {
        ...state,
        daySchedules: state.daySchedules.filter(i => {
          return i.id != action.daySchedule.id;
        })
      };
    default:
      return state;
  }
};

export default AppReducer;
