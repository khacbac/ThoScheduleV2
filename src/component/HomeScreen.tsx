import * as React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import { Calendar, Agenda } from "react-native-calendars";
import Modal from "react-native-modal";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import NavigationUtils, { Navigation } from "../utills/NavigationUtils";
import { setDatas } from "../redux/action/AppAction";
import ReducerName from "../redux/config/ReducerName";
import { connect } from "react-redux";
import colors from "../res/colors";
import moment from "moment";
import Utils from "../utills/Utils";
import { AdvisoryType } from "../model/Advisory";
import ConfigParam from "../config/ConfigParam";
import string from "../res/string";
import Screenname from "../config/ScreenName";
import CalendarDay from "../model/CalendarDay";

interface Props {
  navigation: Navigation;
  setDatas: (datas: any) => void;
  datas: any;
}

interface State {
  // items;
  modalVisible: boolean;
}

export class DaySchedule {
  // ten khach hang.
  public name: string;
  // mã khách hàng.
  public id: string;
  // ten nguoi giam ho.
  public protectorName: string;
  // ngay tu van, dinh dang : Date.
  public date: Date;
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

  constructor() {}
}

class HomeScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      // items: {},
      modalVisible: false
    };
  }

  // loadItems = day => {
  //   console.log("BACHK_loadItems: ", day);
  //   // console.log("BACHK_loadItems_day: ", day);
  //   setTimeout(() => {
  //     for (let i = -15; i < 80; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = Utils.formatDate(new Date(time));
  //       if (!this.props.datas[strTime]) {
  //         this.props.datas[strTime] = [];
  //         // const numItems = Math.floor(Math.random() * 5);
  //         // for (let j = 0; j < numItems; j++) {
  //         //   let ds = new DaySchedule();
  //         //   ds.note = "Item for " + strTime;
  //         //   ds.date = new Date(time);
  //         //   // ds.dateString = strTime;
  //         //   ds.timeString = Utils.formatDate(ds.date, "hh:mm A");
  //         //   ds.key = strTime + "-" + j;
  //         //   ds.phoneNumber = "0389988534";
  //         //   ds.name = "Truong Thi Phuong Thao";
  //         //   ds.id = "ST1103";
  //         //   ds.protectorName = "Ho Khac Bac";
  //         //   ds.advisoryType = AdvisoryType.Persion;
  //         //   this.props.datas[strTime].push(ds);
  //         // }
  //       }
  //     }
  //     //console.log(this.state.items);
  //     const newItems = {};
  //     Object.keys(this.props.datas).forEach(key => {
  //       newItems[key] = this.props.datas[key];
  //     });
  //     // this.setState({
  //     //   items: newItems
  //     // });
  //     this.props.setDatas(newItems);
  //   }, 1000);

  //   // console.log(`Load Items for ${day.year}-${day.month}`);
  // };

  // renderItem = (item: DaySchedule) => {
  //   let advisorys = ConfigParam.getAdvisorys();
  //   let advisory = advisorys.find(i => {
  //     return i.type == item.advisoryType;
  //   });
  //   let advisoryStr = advisory.label;

  //   // let listDS = this.props.datas[Utils.formatDate(item.date)];
  //   // let index = listDS.indexOf(item);

  //   // console.log("BACHK_renderItem: ", listDS, " --- ", index);
  //   return (
  //     <View>
  //       <TouchableOpacity
  //         style={[styles.item]}
  //         onPress={() => {
  //           NavigationUtils.toDetailScreen(this.props.navigation, item);
  //         }}
  //       >
  //         <View>
  //           <View style={{ flexDirection: "row" }}>
  //             <Text>Mã khách hàng: </Text>
  //             <Text>{`${item.id}`}</Text>
  //           </View>

  //           <View style={{ flexDirection: "row", marginTop: 5 }}>
  //             <Text>Tên khách hàng: </Text>
  //             <Text>{`${item.name || string.str_dottype}`}</Text>
  //           </View>

  //           <View style={{ flexDirection: "row", marginTop: 5 }}>
  //             <Text>Người giám hộ: </Text>
  //             <Text>{`${item.protectorName || string.str_dottype}`}</Text>
  //           </View>

  //           <View style={{ flexDirection: "row", marginTop: 5 }}>
  //             <Text>Giờ tư vấn: </Text>
  //             <Text>{`${Utils.getTimeFormat(item.date)}`}</Text>
  //           </View>

  //           <View style={{ flexDirection: "row", marginTop: 5 }}>
  //             <Text>Loại tư vấn: </Text>
  //             <Text>{`${advisoryStr}`}</Text>
  //           </View>

  //           <View style={{ flexDirection: "row", marginTop: 5 }}>
  //             <Text>Số điện thoại: </Text>
  //             <Text>{`${item.phoneNumber || string.str_dottype}`}</Text>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //       {/* {index == listDS.length - 1 && this._renderAddButton(item.date)} */}
  //     </View>
  //   );
  // };

  // _renderAddButton = date => {
  //   let ds = new DaySchedule();
  //   ds.date = date;
  //   return (
  //     <View>
  //       <TouchableOpacity
  //         onPress={() => {
  //           NavigationUtils.toDetailScreen(this.props.navigation, ds, true);
  //         }}
  //       >
  //         <Text>adadaadadÏ</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // renderEmptyDate = day => {
  //   let ds = new DaySchedule();
  //   ds.date = new Date(day);
  //   return (
  //     <TouchableOpacity
  //       style={styles.emptyDate}
  //       onPress={() => {
  //         NavigationUtils.toDetailScreen(this.props.navigation, ds, true);
  //       }}
  //     >
  //       <Text>I'm buzy!</Text>
  //     </TouchableOpacity>
  //   );
  // };

  // rowHasChanged = (r1: DaySchedule, r2: DaySchedule) => {
  //   if (
  //     r1.name != r2.name ||
  //     r1.id != r2.id ||
  //     r1.protectorName != r2.protectorName ||
  //     r1.date != r2.date ||
  //     new Date(r1.date).getTime() != new Date(r2.date).getTime() ||
  //     r1.timeString != r2.timeString ||
  //     r1.advisoryType != r2.advisoryType ||
  //     r1.note != r2.note ||
  //     r1.phoneNumber != r2.phoneNumber
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

  // dateToString = time => {
  //   // const date = new Date(time);
  //   // return date.toISOString().split("T")[0];
  //   return Utils.formatDate(new Date(time));
  // };

  render() {
    // const dotColor = {
    //   color: colors.colorMain
    // };
    // let workedKeys = Object.keys(this.props.datas);
    // var markedDates = {};
    // workedKeys.forEach(item => {
    //   if (this.props.datas[item] && this.props.datas[item].length > 0) {
    //     markedDates = {
    //       ...markedDates,
    //       [item]: {
    //         dots: [dotColor],
    //         selected: true,
    //         selectedColor: colors.colorMain
    //       }
    //     };
    //   }
    // });
    // console.log("BACHK_workedKeys: ", workedKeys);

    // var markedDates = workedKeys.reduce(
    //   (c, v) =>
    //     Object.assign(c, {
    //       [v]: {
    //         dots: [dotColor],
    //         selected: true,
    //         selectedColor: colors.colorMain
    //       }
    //     }),
    //   {}
    // );
    return (
      <View style={{ flex: 1 }}>
        {/* <Agenda
          items={this.props.datas}
          loadItemsForMonth={this.loadItems}
          selected={Utils.formatDate(new Date())}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          // markedDates={{
          //   "2019-07-13": {
          //     dots: [dotColor],
          //     selected: true,
          //     selectedColor: colors.colorMain
          //   }
          // }}
          markedDates={markedDates}
          markingType="multi-dot"
        /> */}

        <Calendar
          // Initially visible month. Default = Date()
          current={Utils.formatDate(new Date())}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // minDate={"2012-05-10"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // maxDate={"2012-05-30"}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day: CalendarDay) => {
            console.log("selected day", day);
            NavigationUtils.toScheduleList(this.props.navigation, day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={day => {
            console.log("selected day", day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"yyyy MM"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            console.log("month changed", month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // renderArrow={direction => <Arrow />}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={false}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          // onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon left. It receive a callback can go next month
          // onPressArrowRight={addMonth => addMonth()}
        />

        <ActionButton buttonColor={colors.colorMain}>
          <ActionButton.Item
            buttonColor={colors.colorSub}
            title="Bảng lương"
            onPress={() =>
              NavigationUtils.toSalaryScreen(this.props.navigation)
            }
          >
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={colors.colorSub}
            title="Cài đặt"
            onPress={() => {}}
          >
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
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
)(HomeScreen);

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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
