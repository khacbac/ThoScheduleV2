import * as React from "react";
import colors from "../res/colors";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import ReducerName from "../redux/config/ReducerName";
import NavigationUtils, {
  NavigationParamKey,
  Navigation
} from "../utills/NavigationUtils";
import { setDatas } from "../redux/action/AppAction";
import RadioGroup from "react-native-radio-buttons-group";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import Utils from "../utills/Utils";
import Advisory, { AdvisoryType } from "../model/Advisory";
import ConfigParam from "../config/ConfigParam";
import DaySchedule from "../model/DaySchedule";
import CalendarDay from "../model/CalendarDay";

interface Props {
  // datas: any;
  navigation: Navigation<any>;
  setDatas: (datas: any) => void;
}

interface State {
  daySchedule: DaySchedule;
}

class DetailScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    let ds: DaySchedule = NavigationUtils.getParam<DaySchedule>(
      navigation,
      NavigationParamKey.DaySchedule,
      null
    );
    return {
      title: Utils.formatDateFromTimestamp(ds.date.timestamp)
    };
  };

  private daySchedule: DaySchedule;

  private daySchedules: Array<DaySchedule>;

  private isAdd: boolean = false;

  constructor(props) {
    super(props);
    // get from navigation.
    this.daySchedule = NavigationUtils.getParam<DaySchedule>(
      this.props.navigation,
      NavigationParamKey.DaySchedule,
      null
    );
    this.isAdd = NavigationUtils.getParam<boolean>(
      this.props.navigation,
      NavigationParamKey.IsAdd,
      false
    );

    // let ds = this.daySchedule;
    // if (!this.isAdd) {
    //   this.daySchedules =
    //     this.props.datas[
    //       Utils.formatDate(new Date(this.daySchedule.date.timestamp))
    //     ] || [];

    //   ds = this.daySchedules.find(i => {
    //     return i.key == this.daySchedule.key;
    //   });
    // }

    this.state = {
      daySchedule: this.daySchedule
    };
  }

  _renderCustomerID = (day: DaySchedule) => {
    return (
      <View style={styles.itemRoot}>
        <Text style={styles.headerText}>Mã khách hàng (*)</Text>
        <TextInput
          placeholder="Nhập mã khách hàng"
          style={{ marginVertical: 10 }}
          value={day ? day.id : ""}
          onChangeText={text => {
            this.setState({
              daySchedule: { ...day, id: text }
            });
          }}
        />
      </View>
    );
  };

  _renderCustomerName = (day: DaySchedule) => {
    return (
      <View style={styles.itemRoot}>
        <Text style={styles.headerText}>Tên khách hàng</Text>
        <TextInput
          placeholder="Nhập tên khách hàng"
          style={{ marginVertical: 10 }}
          value={day ? day.name : ""}
          onChangeText={text => {
            this.setState({
              daySchedule: { ...day, name: text }
            });
          }}
        />
      </View>
    );
  };

  _renderProtectorName = (day: DaySchedule) => {
    return (
      <View style={styles.itemRoot}>
        <Text style={styles.headerText}>Tên người giám hộ</Text>
        <TextInput
          placeholder="Nhập tên người giám hộ"
          style={{ marginVertical: 10 }}
          value={day ? day.protectorName : ""}
          onChangeText={text => {
            this.setState({
              daySchedule: { ...day, protectorName: text }
            });
          }}
        />
      </View>
    );
  };

  _renderTimeString = (day: DaySchedule) => {
    return (
      <View style={styles.itemRoot}>
        <Text style={styles.headerText}>Giờ tư vấn</Text>
        <DatePicker
          style={{ width: 200, marginTop: 5 }}
          date={new Date(day.date.timestamp)}
          mode="time"
          placeholder="Giờ tư vấn"
          format="hh:mm A"
          // minDate="2016-05-01"
          // maxDate="2016-06-01"
          confirmBtnText="Xác nhận"
          cancelBtnText="Hủy"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              borderColor: colors.colorSub
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={time => {
            let calendarDay: CalendarDay = day.date;
            calendarDay.timestamp =
              moment(
                `${Utils.formatDateFromTimestamp(day.date.timestamp)} ${time}`,
                "YYYY-MM-DD hh:mm A"
              ).unix() * 1000;

            this.setState({
              daySchedule: {
                ...day,
                date: calendarDay
              }
            });
          }}
        />
      </View>
    );
  };

  _renderAdvisoryType = (day: DaySchedule) => {
    let advisoryTypes = ConfigParam.getAdvisorys();

    advisoryTypes = advisoryTypes.map(i => {
      if (i.type == day.advisoryType) {
        return { ...i, selected: true };
      }
      return i;
    });

    return (
      <View style={styles.itemRoot}>
        <Text style={styles.headerText}>Loại tư vấn</Text>
        <View style={{ flexDirection: "row" }}>
          <RadioGroup
            radioButtons={advisoryTypes}
            onPress={this._onRadioPress}
            flexDirection="row"
          />
        </View>
      </View>
    );
  };

  _onRadioPress = (datas: Array<Advisory>) => {
    console.log("BACHK__onRadioPress: ", datas);
    let selectData: Advisory = datas.find(i => {
      return i.selected == true;
    });

    if (selectData) {
      this.setState({
        daySchedule: {
          ...this.state.daySchedule,
          advisoryType: selectData.type
        }
      });
    }
  };

  _renderPhoneNumber = (day: DaySchedule) => {
    return (
      <View style={styles.itemRoot}>
        <Text style={styles.headerText}>Số điện thoại</Text>
        <TextInput
          placeholder="Nhập số điện thoại"
          style={{ marginVertical: 10 }}
          value={day ? day.phoneNumber : ""}
          onChangeText={text => {
            this.setState({
              daySchedule: { ...day, phoneNumber: text }
            });
          }}
        />
      </View>
    );
  };

  _renderActionButton = () => {
    let btnString = this.isAdd ? "THÊM LỊCH" : "CẬP NHẬT";
    return (
      <View
        style={{
          margin: 5,

          marginHorizontal: 15,
          marginVertical: 10,

          // justifyContent: "center",
          // alignItems: "center",
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
            borderRadius: 10,
            backgroundColor: colors.colorMain
          }}
          onPress={() => {
            if (!this.state.daySchedule.id) {
              Alert.alert("", "Bạn chưa nhập mã khách hàng!");
              return;
            }
            this.isAdd ? this._handleAdd() : this._handleEdit();
          }}
        >
          <Text style={{ color: colors.colorWhite }}>{btnString}</Text>
        </TouchableOpacity>

        {!this.isAdd && this.daySchedule.id == this.state.daySchedule.id && (
          <View style={{ width: 10 }} />
        )}

        {!this.isAdd && this.daySchedule.id == this.state.daySchedule.id && (
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.colorSub
            }}
            onPress={() => {
              this._handleDelete();
            }}
          >
            <Text style={{ color: colors.colorWhite }}>XÓA LỊCH</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Thực hiện thêm mới.
  private _handleAdd = (): void => {
    // Alert.alert("", "Xác nhận thêm lịch ?", [
    //   {
    //     text: "OK",
    //     onPress: () => {
    //       const time = this.state.daySchedule.date.timestamp;
    //       const strTime = Utils.formatDate(new Date(time));
    //       let datas = this.props.datas;
    //       if (!datas[strTime]) {
    //         datas[strTime] = [];
    //       }
    //       const nextCount = datas[strTime].length;
    //       let ds = new DaySchedule();
    //       ds.note = "Item for " + strTime;
    //       ds.date = this.state.daySchedule.date;
    //       ds.timeString = Utils.formatDateFromTimestamp(
    //         ds.date.timestamp,
    //         "hh:mm A"
    //       );
    //       ds.key = strTime + "-" + nextCount;
    //       ds.phoneNumber = this.state.daySchedule.phoneNumber;
    //       ds.name = this.state.daySchedule.name;
    //       ds.id = this.state.daySchedule.id;
    //       ds.protectorName = this.state.daySchedule.protectorName;
    //       ds.advisoryType = this.state.daySchedule.advisoryType;
    //       datas[strTime].push(ds);
    //       this.props.setDatas(datas);
    //       NavigationUtils.goBack(this.props.navigation);
    //     }
    //   }
    // ]);
  };

  // Thực hiện cập nhật thông tin.
  private _handleEdit = (): void => {
    // Alert.alert("", "Bạn chắc chắn muốn sửa lịch ?", [
    //   {
    //     text: "OK",
    //     onPress: () => {
    //       this.daySchedules = this.daySchedules.map(i => {
    //         if (i.key == this.state.daySchedule.key) {
    //           return this.state.daySchedule;
    //         }
    //         return i;
    //       });
    //       // update datas.
    //       let datas = {
    //         ...this.props.datas,
    //         [Utils.formatDate(this.daySchedule.date)]: this.daySchedules
    //       };
    //       this.props.setDatas(datas);
    //       NavigationUtils.goBack(this.props.navigation);
    //     }
    //   }
    // ]);
  };

  // Thực hiện xoá lịch.
  private _handleDelete = (): void => {
    // Alert.alert("", "Bạn chắc chắn muốn xoá lịch ?", [
    //   {
    //     text: "OK",
    //     onPress: () => {
    //       this.daySchedules = this.daySchedules.filter(i => {
    //         return i.key != this.state.daySchedule.key;
    //       });
    //       // update datas.
    //       let datas = {
    //         ...this.props.datas,
    //         [Utils.formatDate(this.daySchedule.date)]: this.daySchedules
    //       };
    //       this.props.setDatas(datas);
    //       NavigationUtils.goBack(this.props.navigation);
    //     }
    //   }
    // ]);
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.colorGrayBG }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            {this._renderCustomerID(this.state.daySchedule)}
            {this._renderCustomerName(this.state.daySchedule)}
            {this._renderProtectorName(this.state.daySchedule)}
            {this._renderTimeString(this.state.daySchedule)}
            {this._renderAdvisoryType(this.state.daySchedule)}
            {this._renderPhoneNumber(this.state.daySchedule)}
          </ScrollView>
        </View>

        {/* action button */}
        {this._renderActionButton()}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDatas: (datas: any) => dispatch(setDatas(datas))
  };
};

const mapStateToProps = state => {
  return {
    datas: state[ReducerName.AppReducer].datas
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen);

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  headerText: {
    color: colors.colorMain,
    fontSize: 16
  },
  itemRoot: {
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 15,
    backgroundColor: colors.colorWhite,
    borderRadius: 5
  }
});
