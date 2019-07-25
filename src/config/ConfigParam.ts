import Advisory, { AdvisoryType } from "../model/Advisory";
import colors from "../res/colors";

export default class ConfigParam {
  private static advisorys: Array<Advisory> = new Array();

  public static getAdvisorys(): Array<Advisory> {
    if (this.advisorys.length == 0) {
      // persion.
      let persionType = new Advisory();
      persionType.label = "Cá nhân";
      persionType.color = colors.colorSub;
      persionType.size = 22;
      persionType.selected = false;
      persionType.layout = "row";
      persionType.type = AdvisoryType.Persion;
      persionType.salary = 250000;

      // family.
      let familyType = new Advisory();
      familyType.label = "Gia đình";
      familyType.color = colors.colorSub;
      familyType.size = 22;
      familyType.selected = false;
      familyType.layout = "row";
      familyType.type = AdvisoryType.Family;
      familyType.salary = 200000;

      this.advisorys = [persionType, familyType];
    }
    return this.advisorys;
  }

  public static getPersionAdvisoryType(): Advisory {
    return this.getAdvisorys().find(i => i.type == AdvisoryType.Persion);
  }

  public static getFamilyAdvisoryType(): Advisory {
    return this.getAdvisorys().find(i => i.type == AdvisoryType.Family);
  }
}
