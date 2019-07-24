/**
 * Day format from Calendar.
 */
export default class CalendarDay {
  public dateString: string;
  public day: number;
  public month: number;
  public timestamp: number;
  public year: number;

  constructor() {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.day = new Date().getDate();
    this.timestamp = Date.now();
  }
}
