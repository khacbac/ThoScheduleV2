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

interface Props {
  navigation: Navigation;
  setDatas: (datas: any) => void;
  datas: any;
}

interface State {
  // items;
  modalVisible: boolean;
}

enum AdvisoryType {
  Persion = 0,
  Family = 1
}

class DaySchedule {
  // ten khach hang.
  public name: string;
  // mã khách hàng.
  public id: string;
  // ten nguoi giam ho.
  public protectorName: string;
  // ngay tu van, dinh dang : yyyy-mm-dd.
  public dateString: string;
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

  loadItems = day => {
    // console.log("BACHK_loadItems_day: ", day);
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.props.datas[strTime]) {
          this.props.datas[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            // this.state.items[strTime].push({
            //   name: "Item for " + strTime,
            //   dateString: strTime,
            //   key: strTime + "-" + j
            //   // height: Math.max(50, Math.floor(Math.random() * 150))
            // });
            let ds = new DaySchedule();
            ds.note = "Item for " + strTime;
            ds.dateString = strTime;
            ds.key = strTime + "-" + j;
            ds.name = "Truong Thi Phuong Thao";
            ds.protectorName = "Ho Khac Bac";
            this.props.datas[strTime].push(ds);
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.props.datas).forEach(key => {
        newItems[key] = this.props.datas[key];
      });
      // this.setState({
      //   items: newItems
      // });
      this.props.setDatas(newItems);
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  };

  renderItem = (item: DaySchedule) => {
    // console.log("BACHK_renderItem: ", item);
    return (
      <TouchableOpacity
        style={[styles.item]}
        onPress={() => {
          console.log("BACHK_onPress: ", item);
          // this.setState({
          //   modalVisible: true
          // });
          NavigationUtils.toDetailScreen(this.props.navigation);
        }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text>Mã khách hàng: </Text>
            <Text>{`${item.name}`}</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text>Tên khách hàng: </Text>
            <Text>{`${item.name}`}</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text>Người giám hộ: </Text>
            <Text>{`${item.protectorName}`}</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text>Giờ tư vấn: </Text>
            <Text>{`${item.protectorName}`}</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text>Loại tư vấn: </Text>
            <Text>{`${item.protectorName}`}</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text>Số điện thoại: </Text>
            <Text>0389988534</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <TouchableOpacity style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </TouchableOpacity>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  render() {
    // console.log("BACHK_Item_Datas: ", this.props.datas);
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={this.props.datas}
          loadItemsForMonth={this.loadItems}
          selected={this.timeToString(Date.now())}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
        />
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
