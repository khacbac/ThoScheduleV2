import { AdvisoryType } from "./Advisory";
import CalendarDay from "./CalendarDay";

export default class DaySchedule {
  // ten khach hang.
  public name: string;
  // mã khách hàng.
  public id: string;
  // ten nguoi giam ho.
  public protectorName: string;
  // ngay tu van, dinh dang : Date.
  public date: CalendarDay;
  // ngay tu van, dinh dang : yyyy-mm-dd.
  // public dateString: string;
  // gio tu van, dinh dang : hh:mm A.
  public timeString: string;
  // loai tu van.
  public advisoryType: AdvisoryType = AdvisoryType.Persion;
  // số điện thoại.
  public phoneNumber: string;
  // tien tu van.
  public salary: number =
    this.advisoryType === AdvisoryType.Persion ? 250000 : 2000000;
  // mo ta them.
  public note: string;
  // unique key for item.
  public key: string;

  constructor() {
    this.advisoryType = AdvisoryType.Persion;
    this.date = new CalendarDay();
  }
}
