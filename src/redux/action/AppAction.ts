enum AppActionType {
  SET_DATAS = "SET_DATAS"
}

const setDatas = (datas: any) => ({
  type: AppActionType.SET_DATAS,
  datas: datas
});

export { AppActionType, setDatas };
