import * as React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
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

interface Props {
  navigation: Navigation<any>;
}

interface State {
  datas: Array<DaySchedule>;
}

class ScheduleListScreen extends React.Component<Props, State> {
  private calendarDay: CalendarDay;

  constructor(props) {
    super(props);
    this.calendarDay = NavigationUtils.getParam<CalendarDay>(
      this.props.navigation,
      NavigationParamKey.CalendarDay,
      null
    );

    console.log("BACHK_ScheduleListScreen: ", this.calendarDay);

    let schedule1 = new DaySchedule();
    schedule1.id = "MH001";
    schedule1.name = "Ho Khac Bac 1";
    schedule1.advisoryType = AdvisoryType.Family;

    let schedule2 = new DaySchedule();
    schedule2.id = "MH002";
    schedule2.name = "Ho Khac Bac 2";
    schedule2.advisoryType = AdvisoryType.Family;

    let schedule3 = new DaySchedule();
    schedule3.id = "MH003";
    schedule3.name = "Ho Khac Bac 3";
    schedule3.advisoryType = AdvisoryType.Persion;

    let arr = [];
    arr.push(schedule1);
    arr.push(schedule2);
    arr.push(schedule3);

    this.state = {
      datas: arr
    };
  }

  _renderScheduleList = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.datas}
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

          <Text style={styles.txtRight}>{`${item.name}`}</Text>
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
            day.timeString = Utils.formatDateFromTimestamp(day.date.timestamp,"hh:mm A");
            NavigationUtils.toDetailScreen(this.props.navigation, day, true);
          }}
        >
          <Text style={{ color: colors.colorWhite }}>THÊM MỚI</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.colorWhite }}>
        {this._renderScheduleList()}
        {this._renderActionButton()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    datas: state[ReducerName.AppReducer].datas
  };
};

export default connect(mapStateToProps)(ScheduleListScreen);

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
