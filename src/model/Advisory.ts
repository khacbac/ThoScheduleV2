export default class Advisory {
  public label: string;
  public color: string;
  public size: 22;
  public selected: boolean;
  public layout: string;
  public type: AdvisoryType;
  public salary: number;
}

export enum AdvisoryType {
  Persion = 0,
  Family = 1
}
