import * as React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import colors from "../res/colors";
import { SafeAreaView } from "react-navigation";
import { Reference } from "react-native-firebase/database";
import firebase from "react-native-firebase";
import Utils from "../utills/Utils";
import NavigationUtils, {
  Navigation,
  NavigationParamKey
} from "../utills/NavigationUtils";
import CalendarDay from "../model/CalendarDay";
import DaySchedule from "../model/DaySchedule";
import Advisory, { AdvisoryType } from "../model/Advisory";
import ConfigParam from "../config/ConfigParam";

interface Props {
  navigation: Navigation<any>;
}

interface State {
  salarys: Array<Salary>;
}

class Month {
  name: string;
  number: number;
}

class Salary {
  date: string;
  schedules: Array<DaySchedule>;
}

class SalaryScreenForMonth extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    let ds: CalendarDay = NavigationUtils.getParam<CalendarDay>(
      navigation,
      NavigationParamKey.SalaryCalendarDay,
      new CalendarDay()
    );
    return {
      title: Utils.formatDateFromTimestamp(ds.timestamp, "MM-YYYY")
    };
  };

  private months: Array<Month>;

  private calendarDay: CalendarDay;

  private databaseRef: Reference;

  constructor(props) {
    super(props);
    this.calendarDay = NavigationUtils.getParam<CalendarDay>(
      this.props.navigation,
      NavigationParamKey.SalaryCalendarDay,
      new CalendarDay()
    );
    // lay tham chieu den danh sach lichj lam viec theo ngay.
    this.databaseRef = firebase
      .database()
      .ref()
      .child(
        Utils.formatDate(
          new Date(this.calendarDay.year, this.calendarDay.month),
          "MM-YYYY"
        )
      );

    this.state = {
      salarys: []
    };
  }

  /**
   * Ham check lieu database ref co null ko.
   */
  private isDatabaseRefNull(): boolean {
    return this.databaseRef == null || this.databaseRef == undefined;
  }

  _renderSalarys = () => {
    let numPersion = 0;
    let persionSalary = 0;
    let numFamily = 0;
    let familySalary = 0;
    this.state.salarys.forEach(item => {
      let persions = item.schedules.filter(
        i => i.advisoryType == AdvisoryType.Persion
      );
      numPersion += persions.length;
      let familys = item.schedules.filter(
        i => i.advisoryType == AdvisoryType.Family
      );
      numFamily += familys.length;
    });

    persionSalary = numPersion * ConfigParam.getPersionAdvisoryType().salary;
    familySalary = numFamily * ConfigParam.getFamilyAdvisoryType().salary;
    let totalSalary = persionSalary + familySalary;

    return (
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: colors.colorWhite,
          shadowColor: colors.colorBlackMedium,
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 0.3
        }}
      >
        <View>
          <View>
            <Text style={{ color: colors.colorBlack, fontSize: 16 }}>
              Số ca cá nhân
            </Text>
            <Text
              style={{ color: colors.colorMain, fontSize: 16, marginTop: 5 }}
            >
              {numPersion}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: colors.colorBlack, fontSize: 16 }}>
              Tổng tiền tư vấn cá nhân
            </Text>
            <Text
              style={{ color: colors.colorMain, fontSize: 16, marginTop: 5 }}
            >
              {persionSalary}
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: colors.colorGrayBG,
            marginVertical: 10
          }}
        />

        <View>
          <View>
            <Text style={{ color: colors.colorBlack, fontSize: 16 }}>
              Số ca gia đình
            </Text>
            <Text
              style={{ color: colors.colorMain, fontSize: 16, marginTop: 5 }}
            >
              {numFamily}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: colors.colorBlack, fontSize: 16 }}>
              Tổng tiền tư vấn gia đình
            </Text>
            <Text
              style={{ color: colors.colorMain, fontSize: 16, marginTop: 5 }}
            >
              {familySalary}
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: colors.colorGrayBG,
            marginVertical: 10
          }}
        />

        <View>
          <Text
            style={{ color: colors.colorBlack, fontSize: 16 }}
          >{`Tổng tiền ${Utils.formatDateFromTimestamp(
            this.calendarDay.timestamp,
            "MM-YYYY"
          )}`}</Text>
          <Text style={{ color: colors.colorMain, fontSize: 16, marginTop: 5 }}>
            {totalSalary}
          </Text>
        </View>
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    var daySchedule: DaySchedule = item;
    return (
      <View
        style={{
          padding: 20,
          backgroundColor: colors.colorWhite,
          shadowColor: colors.colorBlackMedium,
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 0.3,
          margin: 10
        }}
      >
        <Text style={{ fontSize: 16, color: colors.colorBlack }}>
          {daySchedule.advisoryType}
        </Text>
      </View>
    );
  };

  render() {
    return <SafeAreaView>{this._renderSalarys()}</SafeAreaView>;
  }

  componentDidMount() {
    // this.setState({ inProgress: true });
    if (this.isDatabaseRefNull()) {
      return;
    }

    // get danh sach lich lam viec tu database.
    this.databaseRef.once("value", dataSnapshot => {
      let jsonData = dataSnapshot.toJSON();
      let datas: Array<Salary> = [];
      Object.keys(jsonData).forEach(key => {
        let s = new Salary();
        s.date = key;
        s.schedules = Object.values(jsonData[key]);
        datas.push(s);
      });
      this.setState({
        salarys: datas
      });
      console.log("BACHK_componentDidMount: ", datas);
    });
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(SalaryScreenForMonth);
