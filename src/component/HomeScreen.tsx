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

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Thỏ Schedule"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      // items: {},
      modalVisible: false
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
