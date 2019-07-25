import Screenname from "../config/ScreenName";
import CalendarDay from "../model/CalendarDay";
import DaySchedule from "../model/DaySchedule";

export class Navigation<T = void> {
  public navigate: (name: string, param?: any) => void;
  public getParam: (key: string, defaultValue: T) => T;
  public goBack: () => void;
}

export default class NavigationUtils {
  public static toDetailScreen(
    navigation: Navigation,
    date: DaySchedule,
    isAdd: boolean = false
  ) {
    navigation.navigate(Screenname.DetailScreen, {
      [NavigationParamKey.DaySchedule]: date,
      [NavigationParamKey.IsAdd]: isAdd
    });
  }

  // sang man hinh xem bang luong.
  public static toSalaryScreen(navigation: Navigation) {
    navigation.navigate(Screenname.SalaryScreen, {});
  }

  // sang man hinh xem bang luong.
  public static toSalaryForMonthScreen(
    navigation: Navigation,
    cd: CalendarDay
  ) {
    navigation.navigate(Screenname.SalaryForMonthScreen, {
      [NavigationParamKey.SalaryCalendarDay]: cd
    });
  }

  // sang man hinh danh sach cong viec trong ngay.
  public static toScheduleList(navigation: Navigation, day: CalendarDay) {
    navigation.navigate(Screenname.SheduleListScreen, {
      [NavigationParamKey.CalendarDay]: day
    });
  }

  public static getParam<T>(
    navigation: Navigation<T>,
    key: string,
    defaultValue: T
  ): T {
    return navigation.getParam(key, defaultValue);
  }

  public static goBack(navigation: Navigation) {
    navigation.goBack();
  }
}

class NavigationParamKey {
  public static DaySchedule: string = "DayScheduleKey";
  public static IsAdd: string = "IsAddKey";
  public static CalendarDay: string = "CalendarDayKey";
  public static SalaryCalendarDay: string = "SalaryCalendarDay";
}

export { NavigationParamKey };
