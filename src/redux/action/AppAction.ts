import DaySchedule from "../../model/DaySchedule";

enum AppActionType {
  SET_DATAS = "SET_DATAS",
  VISIBILITY_FLOAT_BUTTON = "VISIBILITY_FLOAT_BUTTON",
  SET_LIST_DAYSCHEDULE = "SET_LIST_DAYSCHEDULE",
  UPDATE_LIST_DAYSCHEDULE = "UPDATE_LIST_DAYSCHEDULE",
  ADD_DAYSCHEDULE = "ADD_DAYSCHEDULE",
  DELETE_DAYSCHEDULE = "DELETE_DAYSCHEDULE"
}

const setDatas = (datas: any) => ({
  type: AppActionType.SET_DATAS,
  datas: datas
});

const setDaySchedules = (daySchedules: Array<DaySchedule>) => ({
  type: AppActionType.SET_LIST_DAYSCHEDULE,
  daySchedules: daySchedules
});

const updateDaySchedule = (oldDs: DaySchedule, daySchedule: DaySchedule) => ({
  type: AppActionType.UPDATE_LIST_DAYSCHEDULE,
  daySchedule: daySchedule,
  oldDaySchedule: oldDs
});

const addDaySchedule = (daySchedule: DaySchedule) => ({
  type: AppActionType.ADD_DAYSCHEDULE,
  daySchedule: daySchedule
});

const deleteDaySchedule = (daySchedule: DaySchedule) => ({
  type: AppActionType.DELETE_DAYSCHEDULE,
  daySchedule: daySchedule
});

const visibilityFloatButton = (isShow: boolean) => ({
  type: AppActionType.VISIBILITY_FLOAT_BUTTON,
  showFloatButton: isShow
});

export {
  AppActionType,
  setDatas,
  visibilityFloatButton,
  setDaySchedules,
  updateDaySchedule,
  addDaySchedule,
  deleteDaySchedule
};
