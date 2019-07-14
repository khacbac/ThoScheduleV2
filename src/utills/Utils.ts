import moment from "moment";

export default class Utils {
  public static formatDate(date: Date, format: string = "YYYY-MM-DD"): string {
    return moment(date).format(format);
  }

  public static getTimeFormat(date: Date, format: string = "hh:mm A"): string {
    return moment(date).format(format);
  }
}
