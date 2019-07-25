import * as React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import ReducerName from "../redux/config/ReducerName";
import Advisory, { AdvisoryType } from "../model/Advisory";
import ConfigParam from "../config/ConfigParam";
import DaySchedule from "../model/DaySchedule";
import NavigationUtils, {
  Navigation,
  NavigationParamKey
} from "../utills/NavigationUtils";
import CalendarDay from "../model/CalendarDay";
import colors from "../res/colors";
import Utils from "../utills/Utils";
import firebase from "react-native-firebase";

import { setDaySchedules } from "../redux/action/AppAction";
import { Reference } from "react-native-firebase/database";

interface Props {
  navigation: Navigation<any>;
  setDaySchedules: (ds: Array<DaySchedule>) => void;
  daySchedules: Array<DaySchedule>;
}

interface State {
  // datas: Array<DaySchedule>;
  inProgress: boolean;
}

class ScheduleListScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    let ds: CalendarDay = NavigationUtils.getParam<CalendarDay>(
      navigation,
      NavigationParamKey.CalendarDay,
      null
    );
    return {
      title: Utils.formatDateFromTimestamp(ds.timestamp)
    };
  };

  private calendarDay: CalendarDay;
  private databaseRef: Reference;

  constructor(props) {
    super(props);

    this.calendarDay = NavigationUtils.getParam<CalendarDay>(
      this.props.navigation,
      NavigationParamKey.CalendarDay,
      null
    );

    // lay tham chieu den danh sach lichj lam viec theo ngay.
    this.databaseRef = firebase
      .database()
      .ref()
      .child(
        Utils.formatDateFromTimestamp(this.calendarDay.timestamp, "MM-YYYY")
      )
      .child(Utils.formatDateFromTimestamp(this.calendarDay.timestamp));

    console.log("BACHK_ScheduleListScreen: ", this.calendarDay);
    // reset list schedule.
    this.props.setDaySchedules([]);

    this.state = {
      inProgress: false
    };
  }

  /**
   * Ham check lieu database ref co null ko.
   */
  private isDatabaseRefNull(): boolean {
    return this.databaseRef == null || this.databaseRef == undefined;
  }

  _renderScheduleList = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.daySchedules}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id + index}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  marginVertical: 10,
                  backgroundColor: colors.colorGrayBG
                }}
              />
            );
          }}
        />
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => {
          NavigationUtils.toDetailScreen(this.props.navigation, item, false);
        }}
      >
        {/* Ma khach hang */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.txtLeft}>{`Mã khách hàng:`}</Text>
          <Text
            style={[
              styles.txtRight,
              {
                color: colors.colorSub
              }
            ]}
          >
            {`${item.id}`}
          </Text>
        </View>

        {/* ten khach hang */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={styles.txtLeft}>{`Tên khách hàng: `}</Text>

          <Text style={styles.txtRight}>{`${item.name || ""}`}</Text>
        </View>

        {/* ngay sinh khach hang */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={styles.txtLeft}>{`Ngày sinh khách hàng: `}</Text>

          <Text style={styles.txtRight}>{`${item.dateOfBirth || ""}`}</Text>
        </View>

        {/* ten nguoi giam ho */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={styles.txtLeft}>{`Tên người giám hộ: `}</Text>

          <Text style={styles.txtRight}>{`${item.protectorName || ""}`}</Text>
        </View>

        {/* thoi gian tu van */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={styles.txtLeft}>{`Thời gian: `}</Text>

          <Text style={styles.txtRight}>{`${item.timeString || ""}`}</Text>
        </View>

        {/* loai tu van */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={styles.txtLeft}>{`Loại tư vấn: `}</Text>

          <Text style={styles.txtRight}>{`${Advisory.getByType(
            item.advisoryType
          )}`}</Text>
        </View>

        {/* so dien thoai */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={styles.txtLeft}>{`Số điện thoại: `}</Text>

          <Text style={styles.txtRight}>{`${item.phoneNumber || ""}`}</Text>
        </View>

        {/* ghi chu */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={styles.txtLeft}>{`Ghi chú: `}</Text>

          <Text style={styles.txtRight}>{`${item.note || ""}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderActionButton = () => {
    return (
      <SafeAreaView style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            height: 45,
            borderRadius: 45 / 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.colorMain,
            width: "50%"
          }}
          onPress={() => {
            let day: DaySchedule = new DaySchedule();
            day.date = this.calendarDay;
            day.timeString = Utils.formatDateFromTimestamp(
              day.date.timestamp,
              "hh:mm A"
            );
            NavigationUtils.toDetailScreen(this.props.navigation, day, true);
          }}
        >
          <Text style={{ color: colors.colorWhite }}>THÊM MỚI</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  _renderProgress = () => {
    if (!this.state.inProgress) return null;
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size="large" color={colors.colorMain} />
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.colorWhite }}>
        {this._renderScheduleList()}
        {this._renderActionButton()}
        {this._renderProgress()}
      </View>
    );
  }

  componentDidMount() {
    this.setState({ inProgress: true });
    if (this.isDatabaseRefNull()) {
      return;
    }

    // get danh sach lich lam viec tu database.
    this.databaseRef.once("value", dataSnapshot => {
      var items: Array<DaySchedule> = new Array<DaySchedule>();
      dataSnapshot.forEach(child => {
        let ds: DaySchedule = new DaySchedule();
        ds.id = child.val().id;
        ds.name = child.val().name;
        ds.protectorName = child.val().protectorName;
        ds.date = child.val().date;
        ds.advisoryType = child.val().advisoryType;
        ds.note = child.val().note;
        ds.databaseKey = child.key;
        ds.dateOfBirth = child.val().dateOfBirth;

        items.push(ds);
      });

      this.props.setDaySchedules(items);
      this.setState({ inProgress: false });
    });
  }
}

const mapStateToProps = state => {
  return {
    daySchedules: state[ReducerName.AppReducer].daySchedules
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDaySchedules: (ds: Array<DaySchedule>) => dispatch(setDaySchedules(ds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleListScreen);

const styles = StyleSheet.create({
  txtLeft: {
    color: colors.colorBlack,
    fontSize: 16,
    flex: 1
  },
  txtRight: {
    color: colors.colorBlack,
    fontSize: 16,
    flex: 1
  }
});
