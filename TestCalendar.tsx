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

interface Props {}

interface State {
  items;
  modalVisible: boolean;
}

enum AdvisoryType {
  Persion = 0,
  Family = 1
}

class DaySchedule {
  // mo ta them.
  public description: string;
  // email khach hang.
  public email: string;
  // ten khach hang.
  public name: string;
  // ngay tu van, dinh dang : yyyy-mm-dd.
  public dateString: string;
  // unique key for item.
  public key: string;
  // ten nguoi giam ho.
  public protectorName: string;
  // email nguoi giam ho.
  public protectorEmail: string;
  // loai tu van.
  public advisoryType: AdvisoryType = AdvisoryType.Persion;
  // tien tu van.
  public salary: number =
    this.advisoryType === AdvisoryType.Persion ? 250000 : 2000000;

  constructor() {}
}

export default class TestCalender extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      modalVisible: false
    };
  }

  loadItems = day => {
    console.log("BACHK_loadItems_day: ", day);
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            // this.state.items[strTime].push({
            //   name: "Item for " + strTime,
            //   dateString: strTime,
            //   key: strTime + "-" + j
            //   // height: Math.max(50, Math.floor(Math.random() * 150))
            // });
            let ds = new DaySchedule();
            ds.description = "Item for " + strTime;
            ds.dateString = strTime;
            ds.key = strTime + "-" + j;
            ds.name = "Truong Thi Phuong Thao";
            ds.protectorName = "Ho Khac Bac";
            this.state.items[strTime].push(ds);
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
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
          this.setState({
            modalVisible: true
          });
          // Alert.alert("", "Change ?", [
          //   {
          //     text: "",
          //     onPress: () => {
          //       // this.state.items.map(i => {
          //       //   if ((i.dateString = item.dateString)) {
          //       //     return { ...i, name: "Change item infomation" };
          //       //   }
          //       //   return i;
          //       // });

          //       let itemChanges = this.state.items[item.dateString];
          //       if (itemChanges) {
          //         itemChanges = itemChanges.map(i => {
          //           if (i.key === item.key) {
          //             return { ...i, name: "Change item infomation" };
          //           }
          //           return i;
          //         });
          //         this.state.items[item.dateString] = itemChanges;
          //       }

          //       const newItems = {};
          //       Object.keys(this.state.items).forEach(key => {
          //         newItems[key] = this.state.items[key];
          //       });
          //       this.setState({
          //         items: newItems
          //       });
          //     },
          //     style: "default"
          //   }
          // ]);
        }}
      >
        <View>
          <Text>{item.description}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>Name: </Text>
            <Text>{`${item.name}`}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text>Protector: </Text>
            <Text>{`${item.protectorName}`}</Text>
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
    console.log("BACHK_Item_Datas: ", this.state.items);
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems}
          selected={"2019-07-11"}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
        />
        <Modal isVisible={this.state.modalVisible}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: 10
              }}
            >
              <View
                style={{
                  padding: 10
                }}
              >
                <Text>I am the modal content!</Text>
                <View>
                  <Text
                    style={{
                      color: "blue"
                    }}
                  >
                    Tên khách hàng (*)
                  </Text>
                  <TextInput
                    placeholder="Nhập tên khách hàng"
                    style={{ marginVertical: 10 }}
                  />
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text
                    style={{
                      color: "blue"
                    }}
                  >
                    Email khách hàng
                  </Text>
                  <TextInput
                    placeholder="Nhập email khách hàng"
                    style={{ marginVertical: 10 }}
                  />
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text
                    style={{
                      color: "blue"
                    }}
                  >
                    Tên người giám hộ
                  </Text>
                  <TextInput
                    placeholder="Nhập tên người giám hộ"
                    style={{ marginVertical: 10 }}
                  />
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text
                    style={{
                      color: "blue"
                    }}
                  >
                    Email người giám hộ
                  </Text>
                  <TextInput
                    placeholder="Nhập email người giám hộ"
                    style={{ marginVertical: 10 }}
                  />
                </View>
                {/* <View
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    margin: 10,
                    paddingHorizontal: 5
                  }}
                >
                  <TextInput
                    placeholder="Customer name"
                    style={{ marginVertical: 10 }}
                  />
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "gray"
                    }}
                  />

                  <TextInput
                    placeholder="Customer email"
                    style={{ marginVertical: 10 }}
                  />
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "gray"
                    }}
                  />

                  <TextInput
                    placeholder="Protector Name"
                    style={{ marginVertical: 10 }}
                  />
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "gray"
                    }}
                  />

                  <TextInput
                    placeholder="Protector Email"
                    style={{ marginVertical: 10 }}
                  />
                </View> */}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

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
  }
});
