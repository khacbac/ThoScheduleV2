enum AppActionType {
  SET_DATAS = "SET_DATAS",
  VISIBILITY_FLOAT_BUTTON = "VISIBILITY_FLOAT_BUTTON"
}

const setDatas = (datas: any) => ({
  type: AppActionType.SET_DATAS,
  datas: datas
});

const visibilityFloatButton = (isShow: boolean) => ({
  type: AppActionType.VISIBILITY_FLOAT_BUTTON,
  showFloatButton: isShow
});

export { AppActionType, setDatas, visibilityFloatButton };
